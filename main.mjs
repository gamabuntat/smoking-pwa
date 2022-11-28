import cigarettes from '/cigarettes.mjs';
import * as storage from '/localStorage.mjs';
import { eventEmitter } from '/utils/eventEmitter.mjs';
import { pipe } from '/utils/pipe.mjs';
import { cx } from '/utils/cx.mjs';

const emitter = eventEmitter();

const events = {
    changeCigarettesToday: 'changeCigarettesToday',
    changeSmokingDays: 'changeSmokingDays',
    changeTotalSmokedCigarettes: 'changeTotalSmokedCigarettes',
};

const c = cx('.counter');
const cRecommended = cx('.recommended');
const cCigarettes = cx('.cigarettes');

document.querySelector(cCigarettes('total-available')).textContent = String(
    cigarettes.reduce((acc, n) => acc + n, 0)
);

const changeMood = ({ today = 0, maxToday = 0 }) => {
    document.querySelector('.mood').textContent = String.fromCodePoint(
        today > maxToday ? 0x1f47a : 0x1f972
    );
};

const updateSmokedTodayCigarettesCounter = ({ today = 0 }) => {
    document.querySelector(c('label')).textContent = String(today);
};

const cigaretteCount = document.querySelector(cCigarettes('count'));
const updateAllSmokedCigarettes = ({ today = 0, total = 0 }) => {
    cigaretteCount.textContent = String(today + total);
};

const cigaretteIcons = document.querySelector(cCigarettes('icons'));
const updateCigaretteIcons = ({ today = 0, total = 0 }) => {
    const cigaretteIcon = String.fromCodePoint(0x1f6ac);
    cigaretteIcons.textContent = Array(today + total)
        .fill(cigaretteIcon)
        .join('');
};

const updateSmokingDays = ({ days = 0 }) => {
    document.querySelector('.total-days__count').textContent = String(days);
};

const updateMaxCigarettesToday = ({ maxToday = 0 }) => {
    document.querySelector(cRecommended('max-today')).textContent =
        String(maxToday);
};

emitter.on(
    events.changeCigarettesToday,
    pipe(({ today }) => today, storage.setCigarettesToday),
    changeMood,
    updateSmokedTodayCigarettesCounter,
    updateAllSmokedCigarettes,
    updateCigaretteIcons
);

emitter.on(
    events.changeSmokingDays,
    pipe(({ days }) => days, storage.setSmokingDays),
    updateSmokingDays,
    updateMaxCigarettesToday,
    changeMood
);

emitter.on(
    events.changeTotalSmokedCigarettes,
    pipe(({ total }) => total, storage.setTotalSmokedCigarettes),
    updateAllSmokedCigarettes,
    updateCigaretteIcons
);

document.querySelector(c('increase')).addEventListener('click', () =>
    emitter.emitt(events.changeCigarettesToday, {
        today: Number(storage.getCigarettesToday()) + 1,
        maxToday: cigarettes.at(Number(storage.getSmokingDays())),
        total: Number(storage.getTotalSmokedCigarettes()),
    })
);

document.querySelector(c('decrease')).addEventListener('click', () =>
    emitter.emitt(events.changeCigarettesToday, {
        today: Math.max(Number(storage.getCigarettesToday()) - 1, 0),
        maxToday: cigarettes.at(Number(storage.getSmokingDays())),
        total: Number(storage.getTotalSmokedCigarettes()),
    })
);

document.querySelector('.done-btn').addEventListener('click', () => {
    const total =
        Number(storage.getTotalSmokedCigarettes()) +
        Number(storage.getCigarettesToday());
    const days = Number(storage.getSmokingDays()) + 1;
    const maxToday = cigarettes.at(days);

    emitter.emitt(events.changeTotalSmokedCigarettes, { total });
    emitter.emitt(events.changeSmokingDays, { days, maxToday });
    emitter.emitt(events.changeCigarettesToday, { today: 0, maxToday, total });
});

(() => {
    const today = Number(storage.getCigarettesToday());
    const maxToday = cigarettes.at(Number(storage.getSmokingDays()));
    const total = Number(storage.getTotalSmokedCigarettes());
    const days = Number(storage.getSmokingDays());

    emitter.emitt(events.changeTotalSmokedCigarettes, { total });
    emitter.emitt(events.changeSmokingDays, { maxToday, days });
    emitter.emitt(events.changeCigarettesToday, { today, maxToday, total });
})();

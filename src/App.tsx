import React  from 'react';

import { useLocalStorage } from '~/hooks/useLocalStorage';
import cigarettes from '~/cigarettes';

export const App = () => {
    const [cigarettesToday, setCigarettesToday] = useLocalStorage(
        'CIGARETTES_TODAY',
        0
    );

    const [totalSmokedCigarettes, setTotalSmokedCigarettes] = useLocalStorage(
        'TOTAL_SMOKED_CIGARETTES',
        0
    );

    const [smokingDays, setSmokingDays] = useLocalStorage('SMOKING_DAYS', 0);
    const maxCigarettesToday = cigarettes.at(smokingDays) || 0;

    return (
        <main>
            <article>
                <header>
                    <h1 className="title">
                        🛑 Stop smoking 🛑
                        <br />
                        maybe today...
                    </h1>
                </header>
                <div className="counter-wrap">
                    <div className="mood">
                        {String.fromCodePoint(
                            cigarettesToday > maxCigarettesToday
                                ? 0x1f47a
                                : 0x1f62c
                        )}
                    </div>
                    <div className="counter">
                        <button
                            className="counter__decrease btn"
                            type="button"
                            title="decrease the number of cigarettes smoked today"
                            aria-label="decrease the number of cigarettes smoked today"
                            onClick={() =>
                                setCigarettesToday((prev) =>
                                    Math.max(prev - 1, 0)
                                )
                            }
                        >
                            -
                        </button>
                        <span className="counter__label">
                            {cigarettesToday}
                        </span>
                        <button
                            className="counter__increase btn"
                            type="button"
                            title="increase the number of cigarettes smoked today"
                            aria-label="increase the number of cigarettes smoked today"
                            onClick={() =>
                                setCigarettesToday((prev) => prev + 1)
                            }
                        >
                            +
                        </button>
                    </div>
                    <p className="recommended">
                        Recommended ≤{' '}
                        <span className="recommended__max-today">
                            {maxCigarettesToday}
                        </span>
                    </p>
                </div>
                <button
                    className="done-btn"
                    type="button"
                    title="Maybe that's all for today?"
                    aria-label="stop it, today..."
                    onClick={() => {
                        setSmokingDays((prev) => prev + 1);
                        setCigarettesToday(0);
                        setTotalSmokedCigarettes(
                            (prev) => prev + cigarettesToday
                        );
                    }}
                >
                    That`&apos;`s all for today
                </button>
                <article className="stats">
                    <header>
                        <h2 className="stats__title">Stats:</h2>
                    </header>
                    <p className="total-days">
                        You are trying to quit smoking already:{' '}
                        <span className="total-days__count">{smokingDays}</span>{' '}
                        day(s)
                    </p>
                    <div className="cigarettes">
                        <span className="cigarettes__icons">
                            {Array(totalSmokedCigarettes + cigarettesToday)
                                .fill(String.fromCodePoint(0x1f6ac))
                                .join('')}
                        </span>
                        <div className="cigarettes__label">
                            (
                            <span className="cigarettes__count">
                                {totalSmokedCigarettes + cigarettesToday}
                            </span>
                            ) /
                            <span className="cigarettes__total-available">
                                {cigarettes.reduce((a, b) => a + b)}
                            </span>
                        </div>
                    </div>
                </article>
            </article>
        </main>
    );
};

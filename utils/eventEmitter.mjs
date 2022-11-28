export const eventEmitter = () => {
    const events = {};

    const on = (evt, ...handlers) => {
        handlers.forEach((h) => {
            (events[evt] || (events[evt] = new Set())).add(h);
        });
    };

    const emitt = (evt, ...args) => {
        events[evt]?.forEach((h) => {
            h(...args);
        });
    };

    return { on, emitt };
};

export const cx =
    (block) =>
    (elem = '', mod = '', modd = '') =>
        `${block}${elem && `__${elem}`}${elem && mod && `_${mod}`}${
            elem && mod && modd && `_${modd}`
        }`;

export const pipe = (...fns) => fns.reduce((a, b) => (...args) => b(a(...args)));

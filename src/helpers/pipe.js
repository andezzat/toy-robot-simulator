const pipe = (...fns) => x => fns.reduce((res, fn) => fn(res), x);

module.exports = pipe;

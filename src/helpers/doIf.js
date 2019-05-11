const doIf = (predicate, fn) => x => predicate(x) ? fn(x) : x;

module.exports = doIf;

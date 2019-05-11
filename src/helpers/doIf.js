const doIf = (predicate, fn) => x => predicate ? fn(x) : x;

module.exports = doIf;

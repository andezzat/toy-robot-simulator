const doIf = (predicate, fn) => x => predicate(x) ? fn(x) : x;

doIf.withBool = (bool, fn) => x => bool ? fn(x) : x;

module.exports = doIf;

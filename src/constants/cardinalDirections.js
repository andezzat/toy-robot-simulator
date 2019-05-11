const { RIGHT } = require('./directions');
const { pipe } = require('../helpers');


const CARDINAL_DIRECTIONS = {
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west',
};
const array = Object.values(CARDINAL_DIRECTIONS);

const getIndexOf = x => array.indexOf(x);
const getByIndex = i => array[i];
const getNextIndex = (direction, maxIndex) => i => direction === RIGHT
  ? i === maxIndex ? 0 : i + 1
  : i === 0 ? maxIndex : i - 1;

CARDINAL_DIRECTIONS.getNext = (current, direction) => pipe(
  getIndexOf,
  getNextIndex(direction, array.length - 1),
  getByIndex,
)(current);
CARDINAL_DIRECTIONS.isValid = x => array.includes(x);


module.exports = CARDINAL_DIRECTIONS;

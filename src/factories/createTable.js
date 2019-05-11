const { pipe, doIf } = require('../helpers');


const NORTH = 'north';
const EAST = 'east';
const SOUTH = 'south';
const WEST = 'west';
const LEFT ='left';
const RIGHT = 'right';

const CARDINAL_DIRECTIONS = {
  NORTH,
  EAST,
  SOUTH,
  WEST,
};
const DIRECTIONS = {
  LEFT,
  RIGHT,
};

const getIndexOf = x => Object.values(CARDINAL_DIRECTIONS).indexOf(x);
const getByIndex = i => Object.values(CARDINAL_DIRECTIONS)[i];
const getNextIndex = (direction, maxIndex) => i => direction === RIGHT
  ? i === maxIndex ? 0 : i + 1
  : i === 0 ? maxIndex : i - 1;
const getNextCardinalDirection = (current, direction) => pipe(
  getIndexOf,
  getNextIndex(direction, Object.values(CARDINAL_DIRECTIONS).length - 1),
  getByIndex,
)(current);

const isDirectionValid = direction => Object.values(DIRECTIONS).includes(direction);
const isCardinalDirectionValid = ({ f }) => Object.values(CARDINAL_DIRECTIONS).includes(f);
const isPositionValid = ({ x, y }) =>
  x >= 0 && x <= maxX
  && y >= 0 && y <= maxY;
const isObjectValid = obj => isPositionValid(obj) && isCardinalDirectionValid(obj);

const updateObjPosition = obj => ({
  [NORTH]: () => ({ ...obj, y: obj.y + 1 }),
  [EAST]: () => ({ ...obj, x: obj.x + 1 }),
  [SOUTH]: () => ({ ...obj, y: obj.y - 1 }),
  [WEST]: () => ({ ...obj, x: obj.x - 1 }),
})[obj.f]();
const updateObjCardinalDirection = direction => obj => ({
  ...obj,
  f: getNextCardinalDirection(obj.f, direction),
});


const createTable = ({ maxX = 5, maxY = 5 } = {}) => {
  let objectsOnTable = {};

  const getObject = name => objectsOnTable[name];

  const updateObjectsOnTable = ({ name, x, y, f }) => {
    objectsOnTable = { ...objectsOnTable, [name]: { name, x, y, f } };
  };


  return {
    getObject,

    getDimensions: () => ({ maxX, maxY }),

    place: pipe(
      doIf(isObjectValid, updateObjectsOnTable),
      () => objectsOnTable,
    ),

    turn: (name, direction) => pipe(
      getObject,
      doIf.withBool(isDirectionValid(direction), pipe(
        updateObjCardinalDirection(direction),
        updateObjectsOnTable,
      )),
      () => getObject(name),
    )(name),

    move: name => pipe(
      getObject,
      updateObjPosition,
      doIf(isPositionValid, updateObjectsOnTable),
      () => getObject(name),
    )(name),
  };
};

createTable.DIRECTIONS = DIRECTIONS;
createTable.CARDINAL_DIRECTIONS = CARDINAL_DIRECTIONS;


module.exports = createTable;

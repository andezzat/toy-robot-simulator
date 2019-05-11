const { pipe, doIf } = require('../helpers');
const { DIRECTIONS, CARDINAL_DIRECTIONS } = require('../constants');

const { NORTH, EAST, SOUTH, WEST } = CARDINAL_DIRECTIONS;


const updateObjPosition = obj => ({
  [NORTH]: () => ({ ...obj, y: obj.y + 1 }),
  [EAST]: () => ({ ...obj, x: obj.x + 1 }),
  [SOUTH]: () => ({ ...obj, y: obj.y - 1 }),
  [WEST]: () => ({ ...obj, x: obj.x - 1 }),
})[obj.f]();
const updateObjCardinalDirection = direction => obj => ({
  ...obj,
  f: CARDINAL_DIRECTIONS.getNext(obj.f, direction),
});


const createTable = ({ maxX = 5, maxY = 5 } = {}) => {
  let objectsOnTable = {};

  const getObject = name => objectsOnTable[name];
  const updateObjectsOnTable = ({ name, x, y, f }) => {
    objectsOnTable = { ...objectsOnTable, [name]: { name, x, y, f } };
  };

  const isPositionValid = ({ x, y }) =>
    x >= 0 && x <= maxX
    && y >= 0 && y <= maxY;
  const isObjectValid = obj => isPositionValid(obj) && CARDINAL_DIRECTIONS.isValid(obj.f);


  return {
    getObject,

    getDimensions: () => ({ maxX, maxY }),

    place: pipe(
      doIf(isObjectValid, updateObjectsOnTable),
      () => objectsOnTable,
    ),

    turn: (name, direction) => pipe(
      getObject,
      doIf.withBool(DIRECTIONS.isValid(direction), pipe(
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

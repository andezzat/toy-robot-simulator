const { pipe, doIf } = require('../helpers');

const CARDINAL_DIRECTIONS = {
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west',
};
const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};


const createTable = ({ maxX = 5, maxY = 5 } = {}) => {
  let objectsOnTable = {};

  const getObject = name => objectsOnTable[name];

  const isPositionValid = ({ x, y }) =>
    x >= 0 && x <= maxX
    && y >= 0 && y <= maxY;

  const isObjectValid = ({ x, y, f }) =>
    isPositionValid({ x, y })
    && Object.values(CARDINAL_DIRECTIONS).includes(f);

  const updateObjectsOnTable = ({ name, x, y, f }) => {
    objectsOnTable = { ...objectsOnTable, [name]: { name, x, y, f } };
  };

  const positionUpdateFns = {
    [CARDINAL_DIRECTIONS.NORTH]: obj => ({ ...obj, y: obj.y + 1 }),
    [CARDINAL_DIRECTIONS.EAST]: obj => ({ ...obj, x: obj.x + 1 }),
    [CARDINAL_DIRECTIONS.SOUTH]: obj => ({ ...obj, y: obj.y - 1 }),
    [CARDINAL_DIRECTIONS.WEST]: obj => ({ ...obj, x: obj.x - 1 }),
  };

  const updateObjPosition = obj => positionUpdateFns[obj.f](obj);


  return {
    getDimensions: () => ({ maxX, maxY }),

    place: pipe(
      doIf(isObjectValid, updateObjectsOnTable),
      () => objectsOnTable,
    ),

    getObject,

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

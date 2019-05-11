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

  const getObject = name => objectsOnTable.find(o => o.name === name);

  const isPositionValid = ({ x, y }) =>
    x >= 0 && x <= maxX
    && y >= 0 && y <= maxY;

  const isObjectValid = ({ x, y, f }) =>
    isPositionValid({ x, y })
    && Object.values(CARDINAL_DIRECTIONS).includes(f);

  const updateObjectsOnTable = ({ name, x, y, f }) => {
    objectsOnTable = { ...objectsOnTable, [name]: { name, x, y, f } };
  };

  const getNewPosition = obj => ({
    NORTH: { ...obj, x: obj.x + 1 },
    EAST: { ...obj, y: obj.y + 1 },
    SOUTH: { ...obj, x: obj.x - 1 },
    WEST: { ...obj, y: obj.y - 1 },
  })[obj.f];


  return {
    getDimensions: () => ({ maxX, maxY }),

    place: pipe(
      doIf(isObjectValid, updateObjectsOnTable),
      () => objectsOnTable,
    ),

    getObject,

    move: () => ({}),
  };
};

createTable.DIRECTIONS = DIRECTIONS;
createTable.CARDINAL_DIRECTIONS = CARDINAL_DIRECTIONS;


module.exports = createTable;

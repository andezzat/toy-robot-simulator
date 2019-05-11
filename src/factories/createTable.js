const { pipe, doIf } = require('../helpers');


const createTable = ({ maxX = 5, maxY = 5 } = {}) => {
  let objectsOnTable = {};

  const getObject = name => objectsOnTable.find(o => o.name === name);
  const updateObjectsOnTable = ({ name, x, y, f }) => {
    objectsOnTable = { ...objectsOnTable, [name]: { x, y, f } };
  };

  return {
    getDimensions: () => {},

    getObjectsOnTable: () => {},
    
    getObject,

    place: updateObjectsOnTable,

    move: () => {},
  };
};

createTable.DIRECTIONS = {};
createTable.CARDINAL_DIRECTIONS = {};


module.exports = createTable;

const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};

DIRECTIONS.isValid = x => Object.values(DIRECTIONS).includes(x);


module.exports = DIRECTIONS;

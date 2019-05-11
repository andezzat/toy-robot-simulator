const { describe } = require('riteway');

const createTable = require('../../src/factories/createTable');
const {
  CARDINAL_DIRECTIONS: { NORTH, EAST, SOUTH, WEST },
  DIRECTIONS: { LEFT, RIGHT },
} = require('../../src/factories/createTable');


describe('createTable.CARDINAL_DIRECTIONS', async assert => {
  assert({
    given: 'N/A',
    should: 'return correct cardinal directions {}',
    actual: createTable.CARDINAL_DIRECTIONS,
    expected: {
      NORTH: 'north',
      EAST: 'east',
      SOUTH: 'south',
      WEST: 'west',
    },
  });
});

describe('createTable.DIRECTIONS', async assert => {
  assert({
    given: 'N/A',
    should: 'return correct directions {}',
    actual: createTable.DIRECTIONS,
    expected: {
      LEFT: 'left',
      RIGHT: 'right',
    },
  });
});

describe('createTable().getDimensions()', async assert => {
  const table = createTable({ maxX: 20, maxY: 15 });
  assert({
    given: 'N/A',
    should: 'return dimensions',
    actual: table.getDimensions(),
    expected: { maxX: 20, maxY: 15 },
  });
});

describe('createTable().place()', async assert => {
  // Valid Placements
  {
    const table = createTable({ maxX: 10, maxY: 5 });
    assert({
      given: '{} w/ valid dimensions & facing direction',
      should: 'return {} including passed {}',
      actual: table.place({ name: 'robotica1', x: 5, y: 4, f: SOUTH }),
      expected: {
        robotica1: { name: 'robotica1', x: 5, y: 4, f: SOUTH },
      },
    });
  }
  {
    const table = createTable({ maxX: 10, maxY: 5 });
    assert({
      given: '{} w/ valid dimensions & facing direction',
      should: 'return {} including passed {}',
      actual: table.place({ name: 'robotica1', x: 5, y: 4, f: SOUTH }),
      expected: {
        robotica1: { name: 'robotica1', x: 5, y: 4, f: SOUTH },
      },
    });
  }

  // Invalid Placements
  {
    const table = createTable({ maxX: 12, maxY: 5 });
    assert({
      given: '{} w/ invalid dimensions',
      should: 'return empty {}',
      actual: table.place({ name: 'robotica1', x: 15, y: 5, f: NORTH }),
      expected: {},
    });
  }
  {
    const table = createTable({ maxX: 8, maxY: 7 });
    assert({
      given: '{} w/ invalid facing direction',
      should: 'return empty {}',
      actual: table.place({ name: 'robotica1', x: 0, y: 0, f: 'north-west' }),
      expected: {},
    });
  }
});

describe('createTable().move()', async assert => {
  // Valid Moves
  {
    const table = createTable({ maxX: 9, maxY: 3 });
    table.place({ name: 'robotica1', x: 3, y: 0, f: NORTH });

    assert({
      given: 'name of {} to move',
      should: 'return {} w/ new position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 3, y: 1, f: NORTH },
    });
  }
  {
    const table = createTable({ maxX: 4, maxY: 12 });
    table.place({ name: 'robotica1', x: 4, y: 8, f: EAST });

    assert({
      given: 'name of {} to move',
      should: 'return {} w/ new position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 5, y: 8, f: EAST },
    });
  }
  {
    const table = createTable({ maxX: 10, maxY: 8 });
    table.place({ name: 'robotica1', x: 2, y: 2, f: SOUTH });

    assert({
      given: 'name of {} to move',
      should: 'return {} w/ new position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 2, y: 1, f: SOUTH },
    });
  }
  {
    const table = createTable({ maxX: 10, maxY: 10 });
    table.place({ name: 'robotica1', x: 10, y: 10, f: WEST });

    assert({
      given: 'name of {} to move',
      should: 'return {} w/ new position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 9, y:10, f: WEST },
    });
  }

  // Invalid Moves
  {
    const table = createTable({ maxX: 5, maxY: 7 });
    table.place({ name: 'robotica1', x: 4, y: 7, f: NORTH });

    assert({
      given: 'name of {} to move (while {} at edge)',
      should: 'return {} w/ same position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 4, y: 7, f: NORTH },
    });
  }
  {
    const table = createTable({ maxX: 8, maxY: 8 });
    table.place({ name: 'robotica1', x: 0, y: 4, f: EAST });

    assert({
      given: 'name of {} to move (while {} at edge)',
      should: 'return {} w/ same position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 0, y: 4, f: EAST },
    });
  }
  {
    const table = createTable({ maxX: 4, maxY: 2 });
    table.place({ name: 'robotica1', x: 2, y: 0, f: SOUTH });

    assert({
      given: 'name of {} to move (while {} at edge)',
      should: 'return {} w/ same position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 2, y: 0, f: SOUTH },
    });
  }
  {
    const table = createTable({ maxX: 12, maxY: 10 });
    table.place({ name: 'robotica1', x: 0, y: 8, f: WEST });

    assert({
      given: 'name of {} to move (while {} at edge)',
      should: 'return {} w/ same position',
      actual: table.move('robotica1'),
      expected: { name: 'robotica1', x: 0, y: 8, f: WEST },
    });
  }
});

describe('createTable().turn()', async assert => {
  {
    const table = createTable({ maxX: 9, maxY: 3 });
    table.place({ name: 'robotica1', x: 3, y: 3, f: NORTH });
  
    assert({
      given: 'name of {} to move & direction',
      should: 'return {} w/ new facing direction',
      actual: table.turn('robotica1', LEFT),
      expected: { name: 'robotica1', x: 3, y: 3, f: WEST },
    });
  }
  {
    const table = createTable({ maxX: 5, maxY: 10 });
    table.place({ name: 'robotica1', x: 5, y: 0, f: SOUTH });
  
    assert({
      given: 'name of {} to move & direction',
      should: 'return {} w/ new facing direction',
      actual: table.turn('robotica1', RIGHT),
      expected: { name: 'robotica1', x: 5, y: 0, f: WEST },
    });
  }
  {
    const table = createTable({ maxX: 4, maxY: 2 });
    table.place({ name: 'robotica1', x: 3, y: 1, f: EAST });
  
    assert({
      given: 'name of {} to move & direction',
      should: 'return {} w/ new facing direction',
      actual: table.turn('robotica1', LEFT),
      expected: { name: 'robotica1', x: 3, y: 1, f: NORTH },
    });
  }
  {
    const table = createTable({ maxX: 9, maxY: 4 });
    table.place({ name: 'robotica1', x: 2, y: 0, f: WEST });
  
    assert({
      given: 'name of {} to move & direction',
      should: 'return {} w/ new facing direction',
      actual: table.turn('robotica1', RIGHT),
      expected: { name: 'robotica1', x: 2, y: 0, f: NORTH },
    });
  }
});

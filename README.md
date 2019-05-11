# Toy Robot Simulator

## Play in CLI

To play the simulator, just do a cheeky `yarn start`.

The table on which the toy is placed has dimensions 5x5 units, the robot should never go beyond these dimensions aka it should never fall off the table.

### Commands

- `place x, y, f`: Places the robot on the table with position X, Y & facing direction F (Nort, East, South, West).
- `left`: Turns robot 90deg anti-clockwise.
- `right`: Turns robot 90deg clockwise.
- `move`: Moves robot 1 unit forward in whichever direction it's currently facing.
- `report`: Reports the robot's current position & facing direction.
- `end`: Exits the app.

Any invalid commands are ignored, casing doesn't matter, spacing between command arguments doesn't matter.

## Factories  - createTable

This is the bread & butter of the app.
It's generic enough that you can place many objects on the table.
However, logic that stops you from placing multiple objects in the same position or clashes when objects move to same position, hasn't been implemented yet as it's outside the scope of the problem.

### Test

There's a spec included that tests the logic & functionality of the `createTable` factory.
Run it in CLI via `yarn test`.

The test leverages `riteway` & `tap-nirvana`.

`riteway`: a super simple testing library that provides basic assertion functionality that aims to answer the most important questions a unit test should. (More info: https://github.com/ericelliott/riteway)

const createTable = require('./factories/createTable');
const { pipe, ask } = require('./helpers');
const { LEFT, RIGHT } = require('./constants/directions');


const numberOrLowerCaseStr = x => !Number.isNaN(Number(x)) ? Number(x) : x.toLowerCase();
const getCleanVal = str => numberOrLowerCaseStr(str.trim());

const getCommands = (table, name) => ({
  place: (x, y, f) => !Number.isNaN(x) && !Number.isNaN(y) 
    && table.place({ name, x, y, f }),
  move: () => table.move(name),
  left: () => table.turn(name, LEFT),
  right: () => table.turn(name, RIGHT),
  report: () => console.log(table.getObject(name)),
  end: () => console.log('\nGoodbye!') || process.exit(0),
});

const getCmdName = str => !str.includes(' ') ? str.trim() : str
  .split(' ')[0]
  .toLowerCase();
const getArgs = str => !str.includes(' ') ? [] : str.match(/ .*/)[0]
  .trim()
  .split(',')
  .map(getCleanVal);
const getCmdObj = commands => answer => ({
  cmd: commands[getCmdName(answer)],
  args: getArgs(answer),
});
const exec = ({ cmd, args }) => cmd &&
  (cmd.length === 0 || cmd.length === args.length)
  && cmd(...args);


const run = async () => {
  const name = 'Toy Robot';
  const table = createTable({ maxX: 5, maxY: 5 });
  const commands = getCommands(table, name);

  const commandLoop = () => ask('--> ')
    .then(pipe(
      getCmdObj(commands),
      exec,
    ))
    .then(commandLoop);

  console.log('\nWelcome!\nPlease type a command to begin...\n');
  commandLoop();
};

run();

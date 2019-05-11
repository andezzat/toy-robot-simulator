const {
  ask: { ask, rl },
} = require('./helpers');


const run = async () => {
  console.log(await ask('How are you? '));
  rl.close();
};

run();

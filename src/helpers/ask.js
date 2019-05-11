const readline = require('readline');


const ask = question => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise(resolve => rl.question(question, answer => {
    resolve(answer);
    rl.close();
  }));
};


module.exports = ask;

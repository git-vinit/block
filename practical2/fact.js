const { Block, Factchain } = require('./factorialno');
let mb = new Factchain();
mb.addBlock(new Block(1, new Date(), 4));
mb.addBlock(new Block(2, new Date(), 7));
console.log(JSON.stringify(mb, null, 3));
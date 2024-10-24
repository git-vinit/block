const { Block, Factchain } = require('./happyno');
let mb = new Factchain();
mb.addBlock(new Block(1, new Date(), 19));
mb.addBlock(new Block(2, new Date(), 7));
console.log(JSON.stringify(mb, null, 3));
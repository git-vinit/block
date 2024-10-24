const { Block, BlockChain } = require('./sum of 2 numbers');
let mb = new BlockChain();
mb.addBlock(new Block(1, '01/08/2024', 25, 5));
console.log(JSON.stringify(mb, null, 3));
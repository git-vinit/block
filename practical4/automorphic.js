const { Block, Blockchain } = require('./automorphicno');
const blockchain = new Blockchain();
const testNumbers = [5, 13, 297, 10, 25, 2045601];
testNumbers.forEach((num, index) => {
    const block = new Block(index + 1, new Date().toISOString(), num);
    blockchain.addBlock(block);
    console.log(`Block ${index + 1} with number ${num} ${block.f ===
        'Automorphic' ? 'is an automorphic number.' : 'is not an automorphic number.'}`);
});
const isChainValid = blockchain.validate();
console.log(`\nIs the blockchain valid? ${isChainValid ? 'Yes' : 'No'}`);
console.log("\nBlockchain:");
blockchain.chain.forEach((block, index) => {
    console.log(`Block ${index}:`, block, `(${block.f === 'Automorphic' ?
        'Automorphic' : 'Not Automorphic'})`);
});
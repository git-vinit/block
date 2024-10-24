const { Block, Blockchain } = require('./kaperkarno');
const blockchain = new Blockchain();
const testNumbers = [45, 13, 297, 10];
testNumbers.forEach((num, index) => {
    const block = new Block(index + 1, new Date().toISOString(), num);
    blockchain.Add_Block(block);
    console.log(`Block ${index + 1} with number ${num} ${block.checkkaps()
        ? 'is a Kaprekar number.' : 'is not a Kaprekar number.'}`);
});
const isChainValid = blockchain.validate();
console.log(`\nIs the blockchain valid? ${isChainValid ? 'Yes' : 'No'}`);
console.log("\nBlockchain:");
blockchain.chain.forEach((block, index) => {
    console.log(`Block ${index}:`, block);
});

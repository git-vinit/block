const crypto = require('crypto');
class Block {
    constructor(index, timestamp, operation, amount, previousHash = '',
        balance) {
        this.index = index;
        this.timestamp = timestamp;
        this.operation = operation;
        this.amount = amount;
        this.previousHash = previousHash;
        this.balance = balance;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return crypto.createHash('sha256').update(
            this.index + this.timestamp + this.operation + this.amount +
            this.previousHash + this.balance
        ).digest('hex');
    }
}
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, '01/08/2024', 'Initial', 100, '0', 100);
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(operation, amount) {
        const latestBlock = this.getLatestBlock();
        const newBlock = new Block(latestBlock.index + 1, new
            Date().toISOString(), operation, amount, latestBlock.hash);
        if (operation === 'D') {
            newBlock.balance = latestBlock.balance + amount;
        } else if (operation === 'W') {
            if (latestBlock.balance >= amount) {
                newBlock.balance = latestBlock.balance - amount;
            } else {
                console.log("Insufficient funds");
                return;
            }
        } else {
            console.log("Invalid operation");
            return;
        }
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        console.log('Block added:', newBlock);
    }
}
module.exports = { BlockChain, Block };
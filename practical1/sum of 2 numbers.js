const c = require('crypto');
class Block {
    constructor(i, t, n1, n2, ph = '') {
        this.i = i;
        this.t = t;
        this.n1 = n1;
        this.n2 = n2;
        this.sum = n1 + n2;
        this.ph = ph;
        this.h = this.calhash();
    }
    calhash() {
        return c.createHash('sha256').update(this.i + this.t + this.sum +
            this.ph).digest('hex');
    }
}
class BlockChain {
    constructor() {
        this.chain = [this.createGBlock()];
    }
    createGBlock() {
        return new Block(0, '01/08/2024', 0, 0, '0');
    }
    getcBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(nb) {
        nb.ph = this.getcBlock().h;
        nb.h = nb.calhash();
        this.chain.push(nb);
    }
}
module.exports = { Block, BlockChain };
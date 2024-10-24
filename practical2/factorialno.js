const c = require('crypto');
class Block {
    constructor(i, t, n, f, ph = '') {
        this.i = i;
        this.t = t;
        this.n = n;
        this.f = this.calFact();
        this.ph = ph;
        this.h = this.calhash();
    }
    calFact() {
        let f;
        if (this.n === 0) {
            f = 1;
        } else {
            f = 1;
            for (let i = 1; i <= this.n; i++) {
                f *= i;
            }
        }
        return f;
    }
    calhash() {
        return c.createHash('sha256').update(this.i + this.t + this.n +
            this.f + this.ph).digest('hex');
    }
}
class Factchain {
    constructor() {
        this.chain = [this.genesisBlock()];
    }
    genesisBlock() {
        return new Block(0, new Date(), 0)
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
module.exports = { Block, Factchain };
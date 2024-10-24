const c = require('crypto');
class Block {
    constructor(i, t, n, ph = '') {
        this.i = i;
        this.t = t;
        this.n = n;
        this.ph = ph;
        this.f = this.calHappyNumber();
        this.h = this.calhash();
    }
    calHappyNumber() {
        while (this.n > 9) {
            let sum = 0;
            while (this.n > 0) {
                let reminder = this.n % 10;
                this.n = Math.floor(this.n / 10);
                let sqr = reminder * reminder;
                sum += sqr;
            }
            this.n = sum;
        }
        if (this.n == 1)
            console.log("Happy Number")
        else {
            console.log("Not Happy Number")
        }
    }
    calhash() {
        return
        c.createHash('sha256').update(`${this.i}${this.t}${this.n}${this.f}${this.
            ph}`).digest('hex');
    }
}
class Factchain {
    constructor() {
        this.chain = [this.genesisBlock()];
    }
    genesisBlock() {
        return new Block(0, new Date().toISOString(), 0);
    }
    getBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(nb) {
        nb.ph = this.getBlock().h;
        nb.h = nb.calhash();
        this.chain.push(nb);
    }
}
module.exports.Block = Block;
module.exports.Factchain = Factchain;
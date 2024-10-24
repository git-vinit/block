const crypto = require('crypto');
class Block {
    constructor(i, t, n, ph = '') {
        this.i = i;
        this.t = t;
        this.n = n;
        this.ph = ph;
        this.f = this.isAutomorphic();
        this.h = this.calhash();
    }
    isAutomorphic() {
        let n1 = this.n;
        let sq = n1 * n1;
        let c = 0;
        let flag = false;
        if (sq !== 0) {
            while (sq !== 0) {
                c = c + 1;
                sq = Math.floor(sq / 10);
            }
            for (let i = 1; i < c; i++) {
                let sq1 = n1 * n1;
                let r = sq1 % Math.pow(10, i);
                if (this.n === r) {
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }
            this.f = flag ? "Automorphic" : "Not Automorphic";
        } else {
            this.f = "Automorphic";
        }
        return this.f;
    }
    calhash() {
        return crypto.createHash('sha256').update(this.i + this.t + this.n
            + this.ph).digest('hex');
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, '07-08-24', 0, '0');
    }
    getCurrentBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        if (newBlock.isAutomorphic() === "Automorphic") {
            newBlock.ph = this.getCurrentBlock().h;
            newBlock.h = newBlock.calhash();
            this.chain.push(newBlock);
        }
    }
    validate() {
        for (let i = 1; i < this.chain.length; i++) {
            let cb = this.chain[i];
            let pb = this.chain[i - 1];
            if (cb.h !== cb.calhash()) {
                return false;
            }
            if (pb.h !== cb.ph) {
                return false;
            }
        }
        return true;
    }
}
module.exports.Block = Block;
module.exports.Blockchain = Blockchain;
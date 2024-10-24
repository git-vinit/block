const c = require('crypto');
class Block {
    constructor(i, t, n1, ph = '') {
        this.i = i;
        this.t = t;
        this.n1 = n1;
        this.ph = ph;
        this.h = this.calhash();
    }
    checkkaps() {
        var cnt = 0, x = this.n1, sq = x * x;
        var y = x, r, f, b, sum, sq1, rem;
        while (x != 0) {
            rem = x % 10;
            cnt++;
            x = parseInt(x / 10);
        }
        r = Math.pow(10, cnt);
        r = parseInt(r);
        f = parseInt(sq / r);
        b = parseInt(sq % r);
        sum = f + b;
        if (sum == y) {
            return true;
        }
        else {
            return false;
        }
    }
    calhash() {
        return
        c.createHash('sha256').update(this.i + this.t + this.n1 + this.ph).digest('hex')
            ;
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.create_GBlock()];
    }
    create_GBlock() {
        return new Block(0, '07-08-24', 0, '0');
    }
    Getcurr_block() {
        return this.chain[this.chain.length - 1];
    }
    Add_Block(nb) {
        if (nb.checkkaps() == true) {
            nb.ph = this.Getcurr_block().h;
            nb.h = nb.calhash();
            this.chain.push(nb);
        }
    }
    validate() {
        for (let i = 1; i < this.chain.length; i++) {
            let cb = this.chain[i];
            let pb = this.chain[i - 1];
            if (cb.h != cb.calhash()) {
                return false;
            }
            if (pb.h != cb.ph) {
                return false;
            }
        }
        return true;
    }
}
module.exports.Block = Block;
module.exports.Blockchain = Blockchain;

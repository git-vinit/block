const { BlockChain } = require('./withdraw');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const myChain = new BlockChain();
rl.question('Enter operation (D for Deposit, W for Withdrawal): ',
    (operation) => {
        rl.question('Enter amount: ', (amount) => {
            amount = parseFloat(amount);
            if (operation !== 'D' && operation !== 'W') {
                console.log('Invalid operation.');
            } else if (isNaN(amount) || amount <= 0) {
                console.log('Invalid amount.');
            } else {
                myChain.addBlock(operation, amount);
            }
            console.log('Blockchain:', JSON.stringify(myChain, null, 2));
            rl.close();
        });
    });

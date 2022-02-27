const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/ProjectFactory.json');

const provider = new HDWalletProvider(
    'beach camp cycle either fatigue typical profit doctor tilt arena response fan',
    'https://rinkeby.infura.io/v3/e2fc636afba441e0bfbb1b390bee5650'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from: ',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode})
    .send({ from: accounts[0], gas:'10000000'});
    
    console.log('Contract deployed on: ',result.options.address);
    provider.engine.stop();
};
deploy();
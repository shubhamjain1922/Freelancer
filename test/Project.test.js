const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/ProjectFactory.json');
const compiledProject = require('../ethereum/build/Project.json');

let accounts;
let factory;
let projectAddress;
let project;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode})
    .send({from: accounts[0], gas:'1000000'});

    await factory.methods.createProject('100','webd').send({
        from: accounts[0],
        gas: '1000000'
    });

    [projectAddress] = await factory.methods.getProjects().call();
    project = await new web3.eth.Contract(JSON.parse(compiledProject.interface),projectAddress);
    
});

describe('Projects', () => {
    it('process',async () => {
        await project.methods.apply('80','resume').send({
            from: accounts[1],
            gas:'1000000'
        })

        await project.methods.hire('0').send({
            from:accounts[0],
            value:'80'
        })

        await project.methods.finish().send({
            from: accounts[0],
            gas:'1000000'
        });

        let balance=await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);
        console.log(balance);
    })
});

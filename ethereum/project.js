import web3 from "./web3";

import Project from './build/Project.json';

const proj =(address) => {
    return new web3.eth.Contract(
        JSON.parse(Project.interface),
        address
    );
};

export default proj;
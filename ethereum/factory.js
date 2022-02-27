import web3 from "./web3";

import ProjectFactory from './build/ProjectFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(ProjectFactory.interface),
    '0xBb395a1477f9Fbd09E0AacA4405f78Ab410203cd'
);

export default instance;
const routes = require('next-routes')();

routes.add('/jobs/:address','/jobs/showjob');

module.exports = routes;
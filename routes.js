/**
 * Main routes file
 */

const helloWorld = require('./api/helloWorld');
const tasks = require('./api/tasks');
const user= require('./api/user');
const authLocal = require('./auth/local');

function routes(app) {
    app.use('/api/helloworld', helloWorld);
    app.use('/api/tasks', tasks);
    app.use('/api/user', user);
    //local auth routes
    app.use('/auth/local', authLocal);
    //app.use('/auth/facebook', facebookLocal);
    //app.use('/auth/google', googleLocal);
}

module.exports = routes;

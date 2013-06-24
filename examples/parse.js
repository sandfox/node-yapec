var yapec = require('../');

//Represents something we could expect process.env to return
var env = {
    APP_PATH: '/opt/appy',
    APP_NAME: 'super server',
    APP_SERVER_ENABLED: 'true',
    APP_SERVER_PROCS: '8',
    APP_SERVER_MAGIC: '2e2'
};

var configSpec = {
    app: {
        path: 'string',
        name: 'string',
        server: {
            enabled: 'bool',
            procs: 'int',
            magic: 'float'
        }
    }
};

var config = yapec(configSpec, env);

console.log(config);

var configSpec = {
        path: 'string',
        name: 'string',
        server: {
            enabled: 'bool',
            procs: 'int',
            magic: 'float'
        }

};

var config = yapec('APP_', configSpec, env);

console.log(config);

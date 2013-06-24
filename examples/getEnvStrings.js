var yapec = require('../');

var configSpec = {
    module : {
        path: 'string',
        name: 'string',
        server: {
            enabled: 'bool',
            procs: 'int',
            magic: 'float'
        }
    }
}

var strings = yapec.getEnvStrings('MY_APP_', configSpec);

console.log(strings);

var strings = yapec.getEnvStrings(configSpec);

console.log(strings);

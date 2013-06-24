var yapec = require('../');

var env = {
	"APP_DIR" : 'thing',
	"APP_NAME": 'whatever',
	"APP_DB": 'lalal',
	"APP_SSL": 'yup',
	"APP_MAGIC_MODE": 'nope',
	"UNICORNS": '88',
	"CHOKKOS": 'empty',
	"GOD_MODE": 'false',
	"APP_CRYPTO_ROUNS": '12.2'
}


var config = yapec.getSpec(env);

console.log(config);


var config = yapec.getSpec('APP_', env);

console.log(config);

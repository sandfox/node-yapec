var traverse = require('traverse');

module.exports = yapec;

function yapec(prefix, spec, env, opts) {

	if (typeof prefix !== 'string') {
		opts = env;
		env = spec;
		spec = prefix;
		prefix = null;
	}

	opts = opts || {};

	return traverse(spec).map(function(node) {

	    if (this.isLeaf) {
	    	var envVarBase = this.path.join('_').toUpperCase();
	    	var envVar = prefix ? prefix + envVarBase : envVarBase;

	    	if (env[envVar] === undefined || env[envVar] === null) {
	    		if(opts.ignoreMissing) {
	    			this.update(null);
	    			return;
	    		}
	    		throw new Error('No environment variable found for "' + envVar + '"');
	    	}

	    	this.update(castToType.call(this, node, env[envVar]));
	    }
	});
}

/**
 * Things we need
 *
 * thing to generate ENV_VAR string from config
 * thing to generate config layout from ENV_VAR
 * options to allow defaults for non-existent strings
 */

yapec.getEnvStrings = function(prefix, spec) {

	if (typeof prefix !== 'string') {
		spec = prefix;
		prefix = null;
	}

	return traverse(spec).reduce(function(strings, node) {
		if (this.isLeaf) {
	    	var envVarBase = this.path.join('_').toUpperCase();
	    	var envVar = prefix ? prefix + envVarBase : envVarBase;
	    	strings.push(envVar);
		}
		return strings;
	}, [])
};

yapec.getSpec =function(prefix, env) {

	if (typeof prefix !== 'string') {
		env = prefix;
		prefix = null;
	}

	var config = {};

	Object.keys(env).forEach(function(envvar){

		var key = envvar;

		if(prefix && envvar.indexOf(prefix) === 0){
			envvar = envvar.substring(prefix.length);
		} else if (prefix && envvar.indexOf(prefix) !== 0){
			return;
		}

		var parts = envvar.toLowerCase().split('_');
		traverse(config).set(parts, env[key]);
	})

	return config;
}

function castToType(type, varString) {

	if (type === null) {
		throw new Error('type must not be "null" for key "' + this.path + '" in the spec');
	}

	if (typeof type !== 'string') {
		throw new TypeError('"type" for key "' + this.path + '"" must be of type "string", not "' + (typeof type) + '"');
	}

	if (type.length < 1) {
		throw new Error('"type" string must not be empty');
	}

	switch (type) {
		case 'string':
			retVal = varString;
			break;
		case 'int':
		case 'integer':
			retVal = parseInt(varString, 10);
			if (isNaN(retVal)) {
				throw new Error('Expected string parseable as "int" for "' + this.path + '" but found this "' + varString + '"');
			}
			break;
		case 'float':
			retVal = parseFloat(varString);
			if (isNaN(retVal)) {
				throw new Error('Expected string parseable as "float" for "' + this.path + '" but found this "' + varString + '"');
			}
			break;
		case 'bool':
			if (varString === 'true' || varString === 'false') {
				retVal = (varString === 'true');
			} else {
				throw new Error('Expected either "true" or "false" for "' + this.path + '" but found "' + varString + '"');
			}
			break;
		default:
			throw new Error('Unknown type "' + type + '" for "' + this.path + '"');
	}
	return retVal;
}

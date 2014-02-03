# YAPEC

__Yet Another Parser for Environmental Configuration__

Because there just aren't enough npm modules for getting config values from your enviroment already!

### Travis Status

[![Build Status](https://travis-ci.org/sandfox/node-yapec.png?branch=master)](https://travis-ci.org/sandfox/node-yapec)

[![NPM](https://nodei.co/npm/yapec.png?downloads=true)](https://nodei.co/npm/yapec/)

## Installation

Be sane, use `npm`

```bash
$ npm install yapec
```

otherwise clone this repo via git

```bash
$ git clone https://github.com/sandfox/node-yapec.git
```


## Usage

```javascript
var yapec = require('yapec');
var config = yapec(['PRE_FIX'], configSpec, process.env, opts);
```

`yapec` takes a spec in the form of an object (which can be nested to your heart's content) where the leaf of every path must be a string which dictates how to parse the corresponding ENV_VAR string.
The path itself is converted into UPPERCASE, and dot seperators exchanged for underscores*.

An optional prefix may be supplied as the first arg which will act as a mask when searching the env object. An optional options object may be supplied, so far the only option is 'ignoreMissing' that accepts a bool, is false by default, and when true rather than throwing an exception if an ENV VAR is missing, instead returns a `null` for that value.

_*yes I realise this is probably not the clearest way to describe what it does but my brain is failing me at this point in time_

_Examples_

Some of these examples can also be found in the examples folder inside this project.

```javascript

var yapec = require('yapec');

//Represents something we could expect process.env to return
var env = {
    APP_PATH: '/opt/appy',
    APP_NAME: 'super server',
    APP_SERVER_ENABLED: 'true',
    APP_SERVER_PROCS: '8',
    APP_SERVER_MAGIC: '2e2'
}

var configSpec = {
    app : {
        path: 'string',
        name: 'string',
        server: {
            enabled: 'bool',
            procs: 'int',
            magic: 'float'
        }
    }
}

var config = yapec(configSpec, env);

console.log(config)
//outputs the following
{ app:
   { path: '/opt/appy',
     name: 'super server',
     server: {
        enabled: true,
        procs: 8,
        magic: 200 }
    }
}

```


Optionally a prefix can be supplied as the first arguement which acts as a mask when looking through the enviroment variables.

_Example_

```javascript
var yapec = require('yapec');

var env = {
    FALLOVER: 'true',
    MY_APP_FALLOVER: 'false'
}

var spec = {
    fallover: 'bool'
}

var config = yapec('MY_APP_', spec, env);

console.log(config);

{fallover:false}

```

### Caveats

Due to the way this modules works certain combinations of ENV VAR strings are forbidden, for example the following would fail because it could not be resolved into an object in any sane way because `app` could not be both a string and object at the same time.

```bash
APP="super app"
APP_DB_NAME="megadb"
APP_DB_PORT="8000"
```

### Helpers

`yapec` also comes with helpers for creating configs from `process.env` style objects and for creating ENV VAR strings from a config object. Checkout the examples folder as it should be pretty self explanatory. _todo - document this better_


`yapec.getSpec([prefix], process.env)`

and

`yapec.getEnvStrings([prefix], config)`


## Stability Index

Based up on [node.js stability index](http://nodejs.org/api/documentation.html#documentation_stability_index)

__Stability: 2 - Unstable__

## Testing

Code is tested with `mocha` + `should`, just run `npm test` as usual.
The tests aren't bad, but they could be more complete. There are travis tests too!

## Upgrades, fixes, ideas

All ideas, bug fixes, suggestions etc are gladly excepted so feel free to raise pull requests and issues.

## License

(The MIT License)

Copyright (c) 2013 James Edward Butler AKA sandfox

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



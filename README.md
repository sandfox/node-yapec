# YAPEC

__Yet Another Parser for Environmental Configuration__

Because there just aren't enough npm modules for getting config values from your enviroment already!

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
var config = yapec(configSpec, process.env);
```

`yapec` takes a spec in the form of an object (which can be nested to your heart's content) where the leaf of every path must be a string which dictates how to parse the corresponding ENV_VAR string.
The path itself is converted into UPPERCASE, and dot seperators exchanged for underscores*.

*_yes I realise this is probably not the clearest way to describe what it does but my brain is failing me at this point in time_

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



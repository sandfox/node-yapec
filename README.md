# YAPEC

__Yet Another Parser for Environmental Configuration__

Because there just aren't enough npm modules for getting config values from your enviroment already!

## Usage

```
fn(configSpec, envVars);
```

_Example_

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

Optionally a prefix can be supplied which acts as a mask.

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

## Testing

Code is tested with `mocha` + `should`.
The tests aren't bad, but they could be more complete.

## License

(The MIT License)

Copyright (c) 2013 James Butler <james.butler@sandfox.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



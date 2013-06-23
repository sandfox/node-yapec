var yapec = require('../index.js');
var env = require('./fixtures/env.json');

var should = require('should');


describe('yapec', function() {

  it('should throw exceptions for incorrect key types', function() {
      [null, undefined, '', 'asd', true, false, 12, 4.5, {}].forEach(function(key) {
        (function() {
          var env = {NAME: '/path/to/nowhere'};
          var spec = {name: key};
          yapec(spec, env);
      }).should.throw();
      });
  });

  it('should throw an exception when environment variable is missing', function() {
    (function() {
      yapec({name: 'string'},{MY_NAME: 'bob'});
    }).should.throw('No environment variable found for "NAME"');
  });

  it('should throw an exception when expecting an ENV VAR to be int but one is not supplied', function() {
    ['null', '', 'asd', 'true', 'false', 'string'].forEach(function(value) {
        (function() {
          var env = {AGE: value};
          var spec = {age: 'int'};
          yapec(spec, env);
      }).should.throw();
    });
  });

  it('should throw an exception when expecting an ENV VAR to be bool but one is not supplied', function() {
    ['null', '', 'asd', '23', '34.5', '0', '1', 'string'].forEach(function(value) {
        (function() {
          var env = {AGE: value};
          var spec = {age: 'bool'};
          yapec(spec, env);
      }).should.throw();
    });
  });

  it('should throw an exception when expecting an ENV VAR to be float but one is not supplied', function() {
    ['null', '', 'asd', 'true', 'false', 'string'].forEach(function(value) {
        (function() {
          var env = {AGE: value};
          var spec = {age: 'float'};
          yapec(spec, env);
      }).should.throw();
    });
  });

  it('should find ENV VARS without a prefix', function() {

      (function(){
        var env = {GOD_MODE: 'true'};
        var spec = {god: {mode: 'bool'}};
        config = yapec(spec, env);
      }).should.not.throw()
  });

  it('should find ENV VARS with a prefix', function() {

      (function(){
        var env = {GOD_MODE: 'true'};
        var spec = {mode: 'bool'};
        config = yapec('GOD_', spec, env);
      }).should.not.throw()

  });

  it('should parse booleans', function() {
      var env = {CAT_FLAP: 'true', CAT_DOOR: 'false'};
      var spec = {cat: {flap: 'bool', door: 'bool'}};
      var config = yapec(spec, env);
      config.cat.flap.should.be.true;
      config.cat.door.should.be.false;
  });

  it('should parse ints', function(){
      ['0', '345', '-100', '1231234234'].forEach(function(value) {
          var env = {UNICORNS: value};
          var spec = {unicorns: 'int'};
          yapec(spec, env).unicorns.should.equal(parseInt(value, 10));
      });
  })

  it('should parse floats', function(){
      ['0', '345', '-0.1', '34.67'].forEach(function(value) {
          var env = {UNICORNS: value};
          var spec = {unicorns: 'float'};
          yapec(spec, env).unicorns.should.equal(parseFloat(value, 10));
      });
  })

  it('should handle strings', function(){
      ['', 'dog', 'RACEhorse', 'rockDjango'].forEach(function(value) {
          var env = {UNICORNS: value};
          var spec = {unicorns: 'string'};
          yapec(spec, env).unicorns.should.equal(value);
      });
  })

});

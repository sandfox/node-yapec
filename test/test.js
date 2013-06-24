var yapec = require('../index.js');
var env = require('./fixtures/env.json');
var should = require('should');


describe('yapec', function() {

  describe('helpers', function() {

    it('should create correct ENV VAR strings for a config [no prefix]', function(){

      var config = {
        crypto: 'bool',
        name: 'string',
        db: {
          host: 'string',
          port: 'int'
        }
      };

      var env = yapec.getEnvStrings(config);

      should.exist(env);
      env.should.be.instanceOf(Array);
      env.should.have.length(4);
      env.should.include('CRYPTO');
      env.should.include('NAME');
      env.should.include('DB_HOST');
      env.should.include('DB_PORT');

    })

    it('should create correct ENV VAR strings for a config [prefixed]', function(){

      var config = {
        crypto: 'bool',
        name: 'string',
        db: {
          host: 'string',
          port: 'int'
        }
      };

      var env = yapec.getEnvStrings('HIPHOP_', config);

      should.exist(env);
      env.should.be.instanceOf(Array);
      env.should.have.length(4);
      env.should.include('HIPHOP_CRYPTO');
      env.should.include('HIPHOP_NAME');
      env.should.include('HIPHOP_DB_HOST');
      env.should.include('HIPHOP_DB_PORT');

    })

    it('should create correct config for an env object [no prefix]', function(){

      var env = {
        BAABAA: 'sheep',
        BLACKSHEEP: 'sheep',
        PIG_STRAW: 'ohno',
        PIG_WOOD: 'ohnoes',
        PIG_BRICK: 'WIN'
      }

      var config = yapec.getSpec(env);

      should.exist(config);
      config.should.eql({
        baabaa: 'sheep',
        blacksheep: 'sheep',
        pig: {
          straw: 'ohno',
          wood: 'ohnoes',
          brick: 'WIN'
        }
      })

    })

    it('should create correct config for an env object [prefixed]', function(){

      var env = {
        BAABAA: 'sheep',
        BLACKSHEEP: 'sheep',
        PIG_STRAW: 'ohno',
        PIG_WOOD: 'ohnoes',
        PIG_BRICK: 'WIN',
        GREY_HOUSE_DOOR: 'open',
        GREY_FLAT_DOOR: 'closed',
        GREY_BAABAA: 'sheepy'
      }

      var config = yapec.getSpec('GREY_', env);

      should.exist(config);
      config.should.eql({
        house: {
          door: 'open'
        },
        flat: {
          door: 'closed'
        },
        baabaa: 'sheepy'
      })

    })

  });

  describe('failure handling while parsing', function() {

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
  });

  describe('parsing', function(){

    it('should find ENV VARS without a prefix', function() {

        (function(){
          var env = {GOD_MODE: 'true'};
          var spec = {god: {mode: 'bool'}};
          var config = yapec(spec, env);
        }).should.not.throw()
    });

    it('should return nulled values when "opt.ignoreMissing" is set', function() {

        (function(){
          var env = {GOD_MODE: 'true'};
          var spec = {
            god: {
              mode: 'bool',
              type: 'string'
            }
          };
          var config = yapec(spec, env, {ignoreMissing: true});
          should.exist(config);
          config.should.eql({
            god: {
              mode: true,
              type: null
            }
          })
        }).should.not.throw()

    });

    it('should find ENV VARS with a prefix', function() {

        (function(){
          var env = {GOD_MODE: 'true'};
          var spec = {mode: 'bool'};
          var config = yapec('GOD_', spec, env);
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

});

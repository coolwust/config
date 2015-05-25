'use strict';

var YamlConfig = require('../lib/yaml.js');
var assert = require('assert');
var child_process = require('child_process');
var promisify = require('promisify');
var load = promisify(YamlConfig.prototype.load);
var save = promisify(YamlConfig.prototype.save);
var readFile = promisify(require('fs').readFile);

describe('YamlConfig', function () {
  beforeEach(function (done) {
    child_process.exec('echo \'hello: world\' >' + __dirname + '/fixtures/foo.yaml', done);
  });
  afterEach(function (done) {
    child_process.exec('rm ' + __dirname + '/fixtures/foo.yaml', done);
  });
  it('yaml should be modified', function (done) {
    var config = new YamlConfig();
    load
      .call(config, __dirname + '/fixtures/foo.yaml')
      .then(function () {
        config.get().hello = 'asia';
      })
      .then(function () {
        save.call(config);
      })
      .then(function () {
        return readFile(__dirname + '/fixtures/foo.yaml', 'utf8');
      })
      .then(function (data) {
        assert.equal(data, 'hello: asia\n');
      })
      .then(done.bind(null, null), done);
  });
});

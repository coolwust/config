'use strict';

var JsonConfig = require('../lib/json.js');
var assert = require('assert');
var child_process = require('child_process');
var fs = require('fs');

describe('JsonConfig', function () {
  beforeEach(function (done) {
    child_process.exec('echo \'{ "hello": "world" }\' > ' + __dirname + '/fixtures/foo.json', done);
  });
  afterEach(function (done) {
    child_process.exec('rm ' + __dirname + '/fixtures/foo.json', done);
  });
  it('config file should be modified', function (done) {
    var config = new JsonConfig();
    config.load(__dirname + '/fixtures/foo.json', function (err) {
      if (err) return done(err);
      config.get().hello = 'asia';
      config.save(function (err) {
        fs.readFile(__dirname + '/fixtures/foo.json', function (err, data) {
          assert.equal(data, '{"hello":"asia"}');
          done(err);
        });
      });
    });
  });
});

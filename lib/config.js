'use strict';

var promisify = require('promisify');
var fs = require('fs');
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

function Config() {
  this.filename = '';
  this.str = '';
  this.obj = null;
}

function load(filename, done) {
  this.filename = filename;
  var promise = new Promise(function(resolve) { resolve() });
  promise
    .then(function () {
      return readFile(filename, { encoding: 'utf8' });
    })
    .then(function (data) {
      this.obj = this._deserialize(data);
      done();
    }.bind(this))
    .catch(function (err) {
      done(err);
    });
}

function get() {
  return this.obj;
}

function save(done) {
  var promise = new Promise(function(resolve) { resolve() });
  promise
    .then(function () {
      return this._serialize(this.obj);
    }.bind(this))
    .then(function (str) {
      writeFile(this.filename, str);
    }.bind(this))
    .then(done)
    .catch(function (err) {
      done(err);
    });
}

function _deserialize(str) {
  throw new Error('_deserialize() method must be implemented');
}

function _serialize(obj) {
  throw new Error('_serialize() method must be implemented');
}

Config.prototype.load = load;
Config.prototype.get = get;
Config.prototype.save = save;
Config.prototype._deserialize = _deserialize;
Config.prototype._serializer = _serialize;
module.exports = Config;


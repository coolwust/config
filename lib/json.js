'use strict';

var Config = require('./config.js');

function JsonConfig() {
  Config.call(this);
}

function _serialize(obj) {
  return JSON.stringify(obj);
}

function _deserialize(str) {
  return JSON.parse(str);
}

var properties = {
  constructor: {
    value: JsonConfig,
    writable: true,
    configurable: true,
    enumerable: false
  }
}
JsonConfig.prototype = Object.create(Config.prototype, properties);
JsonConfig.prototype._serialize = _serialize;
JsonConfig.prototype._deserialize = _deserialize;
module.exports = JsonConfig;

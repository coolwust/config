'use strict';

var js_yaml = require('js-yaml');
var Config = require('./config.js');

function YamlConfig() {
  Config.call(this);
}

function _deserialize(str) {
  return js_yaml.safeLoad(str);
}

function _serialize(obj) {
  return js_yaml.safeDump(obj);
}

var properties = {
  constructor: {
    value: YamlConfig,
    writable: true,
    configurable: true,
    enumerable: false
  }
}
YamlConfig.prototype = Object.create(Config.prototype, properties);
YamlConfig.prototype._deserialize = _deserialize;
YamlConfig.prototype._serialize = _serialize;
module.exports = YamlConfig;

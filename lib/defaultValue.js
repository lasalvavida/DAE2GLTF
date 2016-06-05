'use strict';
var defined = require('./defined');

module.exports = defaultValue;

function defaultValue(value, defaultValue) {
  if (defined(value)) {
    return value;
  } else {
    return defaultValue;
  }
}

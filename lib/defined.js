'use strict';

module.exports = defined;

function defined(reference) {
  return typeof reference !== 'undefined' && reference !== null;
}

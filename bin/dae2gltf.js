#!/usr/bin/env node
'use strict';
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var parseString = require('xml2js').parseString;
var defined = require('./../lib/defined');
var defaultValue = require('./../lib/defaultValue');
var Model = require('./../lib/collada/Model');

if (defined(argv.h) || defined(argv.help)) {
  console.log('Usage: ./bin/dae2gltf.js -i input.dae -o output.gltf\n');
}

var daeFile = defaultValue(argv.i, argv.input);
var outputPath = defaultValue(argv.o, argv.output);

daeFile = './Box.dae';

fs.readFile(daeFile, 'utf8', function(err, daeString) {
  if (err) {
    throw err;
  }
  var model = Model.fromXmlString(daeString);
});

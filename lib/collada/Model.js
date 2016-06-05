'use strict';
var DOMParser = require('xmldom').DOMParser;

var Effect = require('./Effect');
var Material = require('./Material');
var Geometry = require('./Geometry');

var defined = require('./../defined');

module.exports = Model;

function Model(xml) {
  this.xml = xml;

  this.effects = {};
  this.loadEffects();

  this.materials = {};
  this.loadMaterials();

  this.geometries = {};
  this.loadGeometries();

  this.visualScenes = {};
}

Model.fromXmlString = function(xmlString) {
  var xml = new DOMParser().parseFromString(xmlString);
  return new Model(xml);
};

Model.prototype.loadEffects = function() {
  var libraryEffects = this.xml.getElementsByTagName('library_effects');
  if (libraryEffects.length > 0) {
    var effects = libraryEffects[0].getElementsByTagName('effect');
    for (var i = 0; i < effects.length; i++) {
      var effect = effects[i];
      var id = effect.getAttribute('id');
      if (defined(id)) {
        this.effects[id] = new Effect(this, effect);
      }
    }
  }
};

Model.prototype.loadMaterials = function() {
  var libraryMaterials = this.xml.getElementsByTagName('library_materials');
  if (libraryMaterials.length > 0) {
    var materials = libraryMaterials[0].getElementsByTagName('material');
    for (var i = 0; i < materials.length; i++) {
      var material = materials[i];
      var id = material.getAttribute('id');
      if (defined(id)) {
        this.materials[id] = new Material(this, material);
      }
    }
  }
};

Model.prototype.loadGeometries = function() {
  var libraryGeometries = this.xml.getElementsByTagName('library_geometries');
  if (libraryGeometries.length > 0) {
    var geometries = libraryGeometries[0].getElementsByTagName('geometry');
    for (var i = 0; i < geometries.length; i++) {
      var geometry = geometries[i];
      var id = geometry.getAttribute('id');
      if (defined(id)) {
        this.geometries[id] = new Geometry(this, geometry);
      }
    }
  }
};

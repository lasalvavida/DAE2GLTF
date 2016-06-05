'use strict';
var Mesh = require('./Mesh');

module.exports = Geometry;

function Geometry(model, geometryNode) {
  this.model = model;
  this.xml = geometryNode;

  var id = geometryNode.getAttribute('id');
  this.id = id;
  var name = geometryNode.getAttribute('name');
  this.name = name;

  this.meshes = [];
  this.loadMeshes();
}

Geometry.prototype.loadMeshes = function() {
  var meshes = this.xml.getElementsByTagName('mesh');
  for (var i = 0; i < meshes.length; i++) {
    var mesh = meshes[i];
    this.meshes.push(new Mesh(this.model, mesh));
  }
}

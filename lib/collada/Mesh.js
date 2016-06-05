'use strict';
var defined = require('./../defined');

module.exports = Mesh;

function Mesh(model, meshNode) {
  this.model = model;
  this.xml = meshNode;

  this.sources = {};
  this.loadSources();

  this.aliases = {};

  this.triangles = {};
  this.loadAttributes();
}

Mesh.prototype.loadAttributesFrom(tagName) {
  var element = this.xml.getElementsByTagName(tagName);
  if (element.length > 0) {
    var firstElement = element[0];
    var id = firstElement.getAttribute('id');
    var countAttribute = firstElement.getAttribute('count');
    var count = undefined;
    if (defined(countAttribute)) {
      count = parseInt(countAttribute);
    }
    var material = firstElement.getAttribute('material');
    if (defined(material)) {
      this[tagName].material = material;
    }

    var input = firstElement.getElementsByTagName('input');
    var indicesElement = firstElement.getElementsByTagName('p');
    var indices = undefined;
    if (indicesElement.length > 0) {
      indices = indicesElement[0].childNodes[0].nodeValue;
    }
    if (input.length > 0) {
      var inputElement = input[0];
      var semantic = inputElement.getAttribute('semantic');
      var source = inputElement.getAttribute('source').replace('#', '');
      var offset =
      if (defined(id)) {
        this.aliases[id] = source;
      }
      this.attributes[semantic] = {
        source : source,
        offset : offset;
      }
    }
  }
}

Mesh.prototype.loadAttributes = function() {
  this.loadAttributesFrom('vertices');
  this.loadAttributesFrom('triangles');
};

Mesh.prototype.loadSource = function(sourceNode) {
  var source = {};

  var id = sourceNode.getAttribute('id');
  if (defined(id)) {
    source.id = id;
  }
  var name = sourceNode.getAttribute('name');
  if (defined(name)) {
    source.name = name;
  }

  var data = [];
  source.data = data;

  var techniqueCommon = sourceNode.getElementsByTagName('technique_common');
  if (techniqueCommon.length > 0) {
    var accessors = techniqueCommon[0].getElementsByTagName('accessor');
    if (accessors.length > 0) {
      var accessor = accessors[0];
      var count = parseInt(accessor.getAttribute('count'));
      var sourceId = accessor.getAttribute('source').replace('#', '');
      var stride = parseInt(accessor.getAttribute('stride'));

      var sourceDataNode = this.model.xml.getElementById(sourceId);
      var sourceData = sourceDataNode.childNodes[0].nodeValue;
      var sourceDataArray = sourceData.split(' ');

      var subarray = [];
      for (var i = 0; i < count * stride; i++) {
        var element = parseFloat(sourceDataArray[i]);
        if (stride === 1) {
          data.push(element);
        }
        else {
          subarray.push(element);
          if ((i + 1) % stride === 0) {
            data.push(subarray);
            subarray = [];
          }
        }
      }
    }
  }
  return source;
};

Mesh.prototype.loadSources = function() {
  var sources = this.xml.getElementsByTagName('source');
  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    var id = source.getAttribute('id');
    if (defined(id)) {
      this.sources[id] = this.loadSource(source);
    }
  }
};

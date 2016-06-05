'use strict';
var defined = require('./../defined');

module.exports = Technique;

function Technique(model, effect, techniqueNode) {
  this.model = model;
  this.effect = effect;
  this.xml = techniqueNode;

  this.shaders = {};
  this.loadShaders();
}

Technique.prototype.loadShaders = function() {
  var shaders = this.xml.childNodes;
  for (var i = 0; i < shaders.length; i++) {
    var shader = shaders[i];
    var shaderType = shader.tagName;
    if (defined(shaderType)) {
      var shaderAttributes = {};
      var attributes = shader.childNodes;
      for (var j = 0; j < attributes.length; j++) {
        var attribute = attributes[j];
        var attributeName = attribute.tagName;
        if (defined(attributeName)) {
          var attributeChildren = attribute.childNodes;
          for (var k = 0; k < attributeChildren.length; k++) {
            var attributeChild = attributeChildren[k];
            var attributeType = attributeChild.tagName;
            if (defined(attributeType)) {
              var attributeChildDataNodes = attributeChild.childNodes;
              for (var m = 0; m < attributeChildDataNodes.length; m++) {
                var attributeChildDataNode = attributeChildDataNodes[m];
                var attributeValue = attributeChildDataNode.nodeValue;
                if (defined(attributeValue)) {
                  var attributeArray = attributeValue.split(' ');
                  if (attributeArray.length > 0) {
                    if (attributeArray.length === 1) {
                      shaderAttributes[attributeName] = parseFloat(attributeArray[0]);
                    }
                    else {
                      var attributeFloatArray = [];
                      for (var n = 0; n < attributeArray.length; n++) {
                        attributeFloatArray.push(parseFloat(attributeArray[n]));
                      }
                      shaderAttributes[attributeName] = attributeFloatArray;
                    }
                    break;
                  }
                }
              }
            }
          }
        }
      }
      this.shaders[shaderType] = shaderAttributes;
    }
  }
}

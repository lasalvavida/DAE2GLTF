'use strict';
var defined = require('./../defined');

module.exports = Material;

function Material(model, materialNode) {
  this.model = model;
  this.xml = materialNode;

  var id = materialNode.getAttribute('id');
  this.id = id;
  var name = materialNode.getAttribute('name');
  this.name = name;

  this.effects = {};
  this.loadInstanceEffects();
}

Material.prototype.loadInstanceEffects = function() {
  var instanceEffects = this.xml.getElementsByTagName('instance_effect');
  for (var i = 0; i < instanceEffects.length; i++) {
    var instanceEffect = instanceEffects[i];
    var url = instanceEffect.getAttribute('url');
    var effectId = url.replace('#', '');
    var effect = this.model.effects[effectId];
    if (defined(effect)) {
      this.effects[effectId] = effect.clone();
    }
  }
}

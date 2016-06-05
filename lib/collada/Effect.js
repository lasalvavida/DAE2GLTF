'use strict';
var clone = require('clone');

var Technique = require('./Technique');
var defined = require('./../defined');

module.exports = Effect;

function Effect(model, effectNode) {
  this.model = model;
  this.xml = effectNode;

  var id = effectNode.getAttribute('id');
  this.id = id;
  var name = effectNode.getAttribute('name');
  this.name = name;

  this.profiles = {};
  this.loadProfiles();
}

Effect.prototype.loadProfiles = function() {
  var profiles = this.xml.childNodes;
  var profilePrefix = 'profile_';
  for (var i = 0; i < profiles.length; i++) {
    var profile = profiles[i];
    var profileName = profile.tagName;
    if (defined(profileName)) {
      if (profileName.startsWith(profilePrefix)) {
        var profileType = profileName.slice(profilePrefix.length);
        var technique = profile.getElementsByTagName('technique');
        if (technique.length > 0) {
          this.profiles[profileType] = new Technique(this.model, this, technique[0]);
        }
      }
    }
  }
};

Effect.prototype.clone = function() {
  return clone(this);
}

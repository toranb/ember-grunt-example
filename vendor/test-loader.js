Ember.keys(requirejs._eak_seen).filter(function(key) {
  return (/\unit/).test(key);
}).forEach(function(moduleName) {
  require(moduleName, null, null, true);
});

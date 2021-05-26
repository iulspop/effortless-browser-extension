function Goal() {
};

Goal.prototype.set = function(goal) {
  this.description = goal;
};

Goal.prototype.show = function() {
  return this.description;
};

Goal.prototype.complete = function() {
  this.description = undefined;
};

Goal.prototype.interupt = function() {
  this.description = undefined;
};

function Count() {
  this.value = 0;
};

Count.prototype.increment = function() {
  this.value += 1;
};

Count.prototype.reset = function() {
  this.value = 0;
};

module.exports = { Goal, Count };
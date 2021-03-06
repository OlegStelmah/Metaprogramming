'use strict';

// Base class
//
function Ground(area) {
  this.area = area;
}

// Base class prototype method
//
Ground.prototype.calculateCost = function(price) {
  return this.area * price;
};

// MetaFactory to build descendant classes
//
function inheritGround(mixin) {

  const DescendantGround = function(area) {
    this.constructor.apply(this, arguments);
    this.isEmpty = parseInt(area) <= 0;
  };

  DescendantGround.prototype = Object.create(Ground.prototype);

  // Mixin properties to descendant class prototype
  //
  for (let property in mixin) {
    DescendantGround.prototype[property] = mixin[property];
  }
  return DescendantGround;

}

// Create descendant class dynamically
//
const LandOwnership = inheritGround({
  category: 'land',
  type: 'ownership',
  // Add method to descendant class prototype
  toString: function() {
    return this.category + ' ' + this.type + ' / ' + this.area;
  }
});

// Create and use instance
//
const land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: ' + land.calculateCost(7) + ' for ' + land.toString());

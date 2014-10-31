(function() {
  var darkBrown = {r: 43, g: 21, b: 14};
  var lightBrown = {r: 99, g: 53, b: 34};
  var meanBrown = {r: (lightBrown.r + darkBrown.r)/2.0, g: (lightBrown.g + darkBrown.g)/2.0, b: (lightBrown.b + darkBrown.b)/2.0}

  var branchColour = function(depth) {
    var rgb = ['r', 'g', 'b'].map(function(colour) {
      return Math.floor(chance.normal({mean: meanBrown[colour], dev: 10.0}));
    })
    return 'rgb(' + rgb.join(', ') + ')'
  }

  var branchThickness = function(depth) {
    return 1.5 * depth;
  }

  var branchLength = function(depth) {
    return chance.normal({mean: 8.0, dev: 3.0});
  }

  var branchAngle = function(depth) {
    return chance.normal({mean: Math.PI / 9.0, dev: Math.PI / 18.0});
  }

  var drawLine = function(x1, y1, x2, y2, styles){
    Utils.extend(ctx, styles);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath()
    ctx.stroke()
  }

  var drawTree = function(x1, y1, angle1, depth, styles){
    if (depth === 0) return;
    var x2 = x1 + (Math.cos(angle1) * depth * branchLength(depth));
    var y2 = y1 + (Math.sin(angle1) * depth * branchLength(depth));
    styles = Utils.merge(styles, {lineWidth: branchThickness(depth)});
    drawLine(x1, y1, x2, y2, styles);
    drawTree(x2, y2, angle1 - branchAngle(depth), depth - 1, styles);
    drawTree(x2, y2, angle1 + branchAngle(depth), depth - 1, styles);
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  drawTree(canvas.clientWidth/2, canvas.clientHeight, -Math.PI/2, 9, {strokeStyle: branchColour(9)});
})();

(function() {
  var treeBrownMean = {r: 71.0, g: 37.0, b: 24.0};
  var treeBrownStDev = {r: 16.0, g: 4.0, b: 8.0};

  var branchColour = function(depth) {
    var rgb = ['r', 'g', 'b'].map(function(colour) {
      return Math.floor(chance.normal({mean: treeBrownMean[colour], dev: treeBrownStDev[colour]}));
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

  var treeDepth = function() {
    return Math.floor(chance.normal({mean: 9.0, dev: 1.0}));
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

  var treeOrigin = function() {
    var pos = {}
    pos.x = Math.floor((canvas.clientWidth * 0.05) + (0.9 * Math.random() * canvas.clientWidth));
    pos.y = Math.floor(canvas.clientHeight - (0.1 * Math.random() * canvas.clientHeight));
    return pos;
  }

  var drawForest = function(treeCount) {
    for(var i = 0; i < treeCount; i++) {
      var origin = treeOrigin();
      drawTree(origin.x, origin.y, -Math.PI/2, treeDepth(), {strokeStyle: branchColour()});
    }
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  drawForest(10);

  canvas.addEventListener('click', function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawForest(10);
  });

})();

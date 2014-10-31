(function() {
  var treeBrownMean = {r: 71.0, g: 37.0, b: 24.0};
  var treeBrownStDev = {r: 12.0, g: 4.0, b: 8.0};

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
    return depth * chance.normal({mean: 8.0, dev: 3.0});
  }

  var branchAngle = function(depth) {
    return chance.normal({mean: Math.PI / 9.0, dev: Math.PI / 18.0});
  }

  var branchGrowTime = function(depth) {
    return chance.normal({mean: 1000.0, dev: 100.0});
  }

  var treeDepth = function() {
    return Math.floor(chance.normal({mean: 9.0, dev: 1.0}));
  }

  var drawBranch = function(x1, y1, x2, y2, styles){
    Utils.extend(ctx, styles);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath()
    ctx.stroke()
  }

  var drawTree = function(x1, y1, angle1, depth, styles){
    if (depth === 0) return;

    styles = Utils.merge(styles, {lineWidth: branchThickness(depth)});
    var length = branchLength(depth);
    var startTime = null;
    var growTime = branchGrowTime(depth);

    var cosAngle = Math.cos(angle1)
    var sinAngle = Math.sin(angle1)

    var step = function(timestamp) {
      if (startTime === null) startTime = timestamp;
      var currentTime = (timestamp - startTime);
      var currentLength = length * (currentTime / growTime);
      var x2 = x1 + (cosAngle * currentLength);
      var y2 = y1 + (sinAngle * currentLength);

      if (currentLength < length) {
        drawBranch(x1, y1, x2, y2, styles);
        window.requestAnimationFrame(step);
      } else {
        drawTree(x2, y2, angle1 - branchAngle(depth), depth - 1, styles);
        drawTree(x2, y2, angle1 + branchAngle(depth), depth - 1, styles);
      }
    }

    window.requestAnimationFrame(step);
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  canvas.addEventListener('click', function(e) {
    drawTree(e.clientX, e.clientY, -Math.PI/2, treeDepth(), {strokeStyle: branchColour()});
    return true;
  });

})();

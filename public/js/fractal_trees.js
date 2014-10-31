(function() {
  var treeBrownMean = {r: 64.0, g: 40.0, b: 24.0};
  var treeBrownStDev = {r: 12.0, g: 4.0, b: 8.0};

  var leafGreenMean = {r: 80.0, g: 112.0, b: 48.0};
  var leafGreenStDev = {r: 4.0, g: 12.0, b: 4.0};

  var randomColour = function(meanColour, stDevColour) {
    var rgb = ['r', 'g', 'b'].map(function(colour) {
      return Math.floor(chance.normal({mean: meanColour[colour], dev: stDevColour[colour]}));
    })
    return 'rgb(' + rgb.join(', ') + ')'
  }

  var branchColour = function(depth) {
    return randomColour(treeBrownMean, treeBrownStDev);
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

  var leavesPerBranch = function() {
    return chance.normal({mean: 4.0, dev: 2.0});
  }

  var leafLength = function() {
    return chance.normal({mean: 15.0, dev: 4.0});
  }

  var leafAngle = function() {
    return chance.normal({mean: 0.0, dev: Math.PI / 3.0});
  }

  var leafColour = function(depth) {
    return randomColour(leafGreenMean, leafGreenStDev);
  }

  var drawLeaf = function(x1, y1, x2, y2, x3, y3, x4, y4, styles) {
    Utils.extend(ctx, styles);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x3, y3, x2, y2);
    ctx.moveTo(x2, y2);
    ctx.quadraticCurveTo(x4, y4, x1, y1);
    ctx.closePath();
    ctx.fill();
  }

  var drawTree = function(x1, y1, angle1, depth, styles){
    if (depth === 0) {
      styles = Utils.merge(styles, {fillStyle: leafColour()});

      var leafCount = leavesPerBranch();
      for(var i = 0; i < leafCount; i++) {
        var angle2 = leafAngle();
        var currentLeafAngle = angle1 + angle2;
        var length = leafLength();

        var x2 = x1 + (Math.cos(currentLeafAngle) * length);
        var y2 = y1 + (Math.sin(currentLeafAngle) * length);

        var angle3 = currentLeafAngle + (Math.PI / 4.0);
        var x3 = x1 + (Math.cos(angle3) * length / 3.0);
        var y3 = y1 + (Math.sin(angle3) * length / 3.0);

        var angle4 = currentLeafAngle - (Math.PI / 4.0);
        var x4 = x1 + (Math.cos(angle4) * length / 3.0);
        var y4 = y1 + (Math.sin(angle4) * length / 3.0);

        drawLeaf(x1, y1, x2, y2, x3, y3, x4, y4, styles)
      }
    } else {
      styles = Utils.merge(styles, {lineWidth: branchThickness(depth)});
      var length = branchLength(depth);
      var startTime = null;
      var growTime = branchGrowTime(depth);

      var cosAngle = Math.cos(angle1)
      var sinAngle = Math.sin(angle1)
      var x2 = x1;
      var y2 = y2;

      var step = function(timestamp) {
        if (startTime === null) startTime = timestamp;
        var currentTime = (timestamp - startTime);
        var currentLength = length * (currentTime / growTime);

        if (currentLength < length) {
          x2 = x1 + (cosAngle * currentLength);
          y2 = y1 + (sinAngle * currentLength);
          drawBranch(x1, y1, x2, y2, styles);
          window.requestAnimationFrame(step);
        } else {
          drawTree(x2, y2, angle1 - branchAngle(depth), depth - 1, styles);
          drawTree(x2, y2, angle1 + branchAngle(depth), depth - 1, styles);
        }
      }

      window.requestAnimationFrame(step);
    }
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  canvas.addEventListener('click', function(e) {
    window.setTimeout(function() {
      drawTree(e.clientX, e.clientY, -Math.PI/2, treeDepth(), {strokeStyle: branchColour()});
    }, 200);
    return true;
  });

})();

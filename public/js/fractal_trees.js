(function() {
  var setStyles = function (styles) {
    style = styles || {};
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {
        ctx[s] = styles[s];
      }
    }
  }

  var branchLength = function() {
    return chance.normal({mean: 8.0, dev: 1.0});
  }

  var branchAngle = function() {
    return chance.normal({mean: Math.PI / 9.0, dev: Math.PI / 18.0});
  }

  var drawLine = function(x1, y1, x2, y2, styles){
    setStyles(styles);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }

  var drawTree = function(x1, y1, angle1, depth, styles){
    if (depth === 0) return;
    var x2 = x1 + (Math.cos(angle1) * depth * branchLength());
    var y2 = y1 + (Math.sin(angle1) * depth * branchLength());
    drawLine(x1, y1, x2, y2, styles);
    drawTree(x2, y2, angle1 - branchAngle(), depth - 1, styles);
    drawTree(x2, y2, angle1 + branchAngle(), depth - 1, styles);
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  drawTree(canvas.clientWidth/2, canvas.clientHeight, -Math.PI/2, 9, {strokeStyle: '#aa0000', lineWidth: 1});
  ctx.closePath();
  ctx.stroke();
})();

(function() {
  var setStyles = function (styles) {
    style = styles || {};
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {
        ctx[s] = styles[s];
      }
    }
  }

  var branchThickness = function(depth) {
    return 1.5 * depth;
  }

  var branchLength = function(depth) {
    return chance.normal({mean: 8.0, dev: Math.sqrt(depth)});
  }

  var branchAngle = function(depth) {
    return chance.normal({mean: Math.PI / 9.0, dev: Math.PI / 18.0});
  }

  var drawLine = function(x1, y1, x2, y2, styles){
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
    setStyles({lineWidth: branchThickness(depth), strokeStyle: '#aa0000'});
    drawLine(x1, y1, x2, y2, styles);
    drawTree(x2, y2, angle1 - branchAngle(depth), depth - 1, styles);
    drawTree(x2, y2, angle1 + branchAngle(depth), depth - 1, styles);
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  drawTree(canvas.clientWidth/2, canvas.clientHeight, -Math.PI/2, 9);
})();

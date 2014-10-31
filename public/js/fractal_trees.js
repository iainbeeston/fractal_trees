(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var deg_to_rad = Math.PI / 180.0;

  function drawLine(x1, y1, x2, y2, styles){
    style = styles || {};
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {
        ctx[s] = styles[s];
      }
    }
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }

  function drawTree(x1, y1, angle, depth, styles){
    if (depth === 0) return;
    var x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * 10.0);
    var y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * 10.0);
    drawLine(x1, y1, x2, y2, styles);
    drawTree(x2, y2, angle - 20, depth - 1, styles);
    drawTree(x2, y2, angle + 20, depth - 1, styles);
  }

  ctx.beginPath();
  drawTree(300, 500, -90, 9, {strokeStyle: '#aa0000', lineWidth: 1});
  ctx.closePath();
  ctx.stroke();
})();

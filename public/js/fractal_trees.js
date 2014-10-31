(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var angleMean = Math.PI / 9;
  var angleStDev = Math.PI / 18;

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

  function drawTree(x1, y1, angle1, depth, styles){
    if (depth === 0) return;
    var x2 = x1 + (Math.cos(angle1) * depth * 10.0);
    var y2 = y1 + (Math.sin(angle1) * depth * 10.0);
    drawLine(x1, y1, x2, y2, styles);
    drawTree(x2, y2, angle1 - chance.normal({mean: angleMean, dev: angleStDev}), depth - 1, styles);
    drawTree(x2, y2, angle1 + chance.normal({mean: angleMean, dev: angleStDev}), depth - 1, styles);
  }

  ctx.beginPath();
  drawTree(canvas.clientWidth/2, canvas.clientHeight, -Math.PI/2, 9, {strokeStyle: '#aa0000', lineWidth: 1});
  ctx.closePath();
  ctx.stroke();
})();

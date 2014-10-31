(function() {
  window.Utils = {
    extend: function(a, b) {
      for (var bx in b) {
        if (b.hasOwnProperty(bx)) {
          a[bx] = b[bx];
        }
      }
    },
    merge: function(a, b) {
      var r = {};
      Utils.extend(r, a);
      Utils.extend(r, b);
      return r;
    }
  }
})()

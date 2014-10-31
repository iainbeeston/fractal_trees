// This is taken from chance.js - I don't want the whole lib, but
// this should be a drop-in replacement for the normal() function
(function() {
  window.chance = {
    normal: function(options) {
      options = options || {};
      options.mean = options.mean || 0;
      options.dev = options.dev || 1;

      // The Marsaglia Polar method
      var s, u, v, norm,
          mean = options.mean,
          dev = options.dev;

      do {
        // U and V are from the uniform distribution on (-1, 1)
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;

        s = u * u + v * v;
      } while (s >= 1);

      // Compute the standard normal variate
      norm = u * Math.sqrt(-2 * Math.log(s) / s);

      // Shape and scale
      return dev * norm + mean;
    }
  }
})()

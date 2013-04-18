(function(win){
  win = win || {};
  win.requestAnimFrame = (function() {
    var animFrame = window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame;

    if(!animFrame) {
      animFrame = function(callback) {
        window.setTimeout(function() {
          callback.call(this, Date.now());
        }, 1000/60);
      };
    }
    return animFrame;
  })();

  win.cancelAnimFrame = (function() {
    return window.webkitCancelAnimationFrame ||
           window.mozCancelAnimationFrame ||
           window.oCancelAnimationFrame ||
           window.msCancelAnimationFrame ||
           window.clearTimeout;
  })();

})(window);

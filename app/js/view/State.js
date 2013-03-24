(function() {
  app.view.State = Backbone.View.extend({
    className: 'state',
    onRotate: function(orientation) {
      if (orientation === 0) {
        this.$el.hide();
      }
      else if (Math.abs(orientation) === 90) {
        this.$el.show();
      }
    },
    initialize: function() {
      this.$el.hide();
      app.Event.on(app.Event.Rotate, this.onRotate, this);
    }
  });
})();
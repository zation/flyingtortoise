app.view.State = Backbone.View.extend({
  className: 'state',
  onRotate: function(orientation) {
    if (orientation === 0) {
      this.$el.hide();
    }
    else if (Math.abs(orientation) === 90) {
      this.render();
    }
  },
  render: function() {
    this.$el.show();
    var stateView = this;
    this.collection.each(function(task) {
      var switcherView = new app.view.Switcher({
        model: task
      });
      stateView.$el.append(switcherView.$el);
    });
  },
  initialize: function() {
    this.$el.hide();
    app.Event.on(app.Event.Rotate, this.onRotate, this);
  }
});
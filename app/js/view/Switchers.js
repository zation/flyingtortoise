app.view.Switchers = Backbone.View.extend({
  className: 'switchers',
  tagName: 'ul',
  onRotate: function(orientation) {
    if (orientation === 0) {
      this.remove();
    }
  },
  initialize: function() {
    var switchersView = this;
    this.collection.each(function(task) {
      var switcherView = new app.view.Switcher({
        model: task
      });
      switchersView.$el.append(switcherView.$el);
    });
    app.Event.on(app.Event.Rotate, this.onRotate, this);
  }
});
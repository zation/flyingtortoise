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
    var switchers = new app.view.Switchers({
      collection: this.collection
    });
    this.$el.append(switchers.$el);
    var firstTask = this.collection.at(0);
    var stateTaskNameView = new app.view.StateTaskName({
      model: firstTask
    });
    this.$el.append(stateTaskNameView.$el);
    var chartView = new app.view.Chart({
      model: firstTask
    });
    this.$el.append(chartView.$el);
  },
  initialize: function() {
    this.$el.hide();
    app.Event.on(app.Event.Rotate, this.onRotate, this);
  }
});
app.view.StateTaskName = Backbone.View.extend({
  className: 'state-task-name',
  tagName: 'span',
  renderTaskName: function(model) {
    this.$el.text(model.get('name'));
  },
  onRotate: function(orientation) {
    if (orientation === 0) {
      this.remove();
    }
  },
  initialize: function() {
    this.renderTaskName(this.model);
    this.listenTo(app.Event, app.Event.Switch, this.renderTaskName);
    this.listenTo(app.Event, app.Event.Rotate, this.onRotate);
  }
});
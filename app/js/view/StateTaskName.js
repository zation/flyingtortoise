app.view.StateTaskName = Backbone.View.extend({
  className: 'state-task-name',
  tagName: 'span',
  renderTaskName: function(model) {
    this.$el.text(model.get('name'));
  },
  onRotate: function() {
    if (orientation === 0) {
      this.remove();
    }
  },
  initialize: function() {
    this.renderTaskName(this.model);
    app.Event.on(app.Event.Switch, this.renderTaskName, this);
    app.Event.on(app.Event.Rotate, this.onRotate, this);
  }
});
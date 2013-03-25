app.view.StateTaskName = Backbone.View.extend({
  className: 'task-name',
  tagName: 'span',
  renderTaskName: function(model) {
    this.$el.text(model.get('name'));
  },
  initialize: function() {
    this.renderTaskName(this.model);
    app.Event.on(app.Event.Switch, this.renderTaskName, this);
  }
});
app.view.StateTaskName = Backbone.View.extend({
  className: 'task-name',
  tagName: 'span',
  initialize: function() {
    this.$el.text(this.model.get('name'));
  }
});
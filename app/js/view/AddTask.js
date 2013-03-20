app.view.AddTask = Backbone.View.extend({
  className: 'add-task-container',
  events: {
    'click .add-task': 'addTask'
  },
  addTask: function() {
    this.collection.create({
      name: this.$el.find('.new-task-name').val()
    });
    if (this.collection.length > 3) {
      this.$el.hide();
    }
  },
  render: function() {
    this.$el.html(this.template());
  },
  initialize: function() {
    this.template = _.template($('#add_task').html());
    this.render();
  }
});
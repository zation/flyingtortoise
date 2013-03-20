app.view.Home = Backbone.View.extend({
  className: 'home',
  initialize: function() {
    this.template = _.template($('#home').html());

    var addTaskView = new app.view.AddTask({
      collection: this.collection
    });

    var taskListView = new app.view.TaskList({
      collection: this.collection
    });
    this.$el.append(this.template());
    this.$el.append(taskListView.$el);
    this.$el.append(addTaskView.$el);
  }
});
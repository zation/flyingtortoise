app.view.Home = Backbone.View.extend({
  className: 'home',
  initialize: function() {
    this.template = _.template($('#home').html());

    var taskListView = new app.view.TaskList({
      collection: this.collection
    });
    this.$el.append(this.template());
    this.$el.append(taskListView.$el);
  }
});
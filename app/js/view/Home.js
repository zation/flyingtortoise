app.view.Home = Backbone.View.extend({
  className: 'home',
  switchOut: function() {
    this.$el.hide();
  },
  initialize: function() {
    this.template = _.template($('#home').html());

    var taskListView = new app.view.TaskList({
      collection: this.collection
    });
    this.$el.append(this.template());
    this.$el.append(taskListView.$el);
    app.Event.on(app.Event.TaskStart, this.switchOut, this);
  }
});
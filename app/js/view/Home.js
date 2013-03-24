(function() {
  var isActive = true;

  app.view.Home = Backbone.View.extend({
    className: 'home',
    switchOut: function() {
      this.$el.hide();
      isActive = false;
    },
    switchIn: function() {
      this.$el.show();
      isActive = true;
    },
    onRotate: function(orientation) {
      if (Math.abs(orientation) === 90 && this.$el.is(':visible')) {
        this.$el.hide();
      }
      else if (orientation === 0 && isActive) {
        this.$el.show();
      }
    },
    initialize: function() {
      this.template = _.template($('#home').html());

      var taskListView = new app.view.TaskList({
        collection: this.collection
      });
      this.$el.append(this.template());
      this.$el.append(taskListView.$el);
      app.Event.on(app.Event.TaskStart, this.switchOut, this);
      app.Event.on(app.Event.TaskStop, this.switchIn, this);
      app.Event.on(app.Event.Rotate, this.onRotate, this);
    }
  });
})();
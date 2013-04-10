app.view.Switcher = Backbone.View.extend({
  events: {
    'click .activate': 'activate'
  },
  className: 'switcher',
  tagName: 'li',
  activate: function() {
    if (this.$el.hasClass('active')) {
      return;
    }
    this.$el.addClass('active');
    app.Event.trigger(app.Event.Switch, this.model);
  },
  onSwitch: function(task) {
    if (task.get('order') === this.model.get('order')) {
      return;
    }
    this.$el.removeClass('active');
  },
  initialize: function() {
    this.template = _.template($('#switcher').html());
    var totalHours = this.model.get('total');
    this.$el.append(this.template({
      totalHours: totalHours,
      unit: 'sec'
    }));
    var order = this.model.get('order');
    this.$el.addClass('task-order-' + order);
    if (order === 1) {
      this.$el.addClass('active');
    }
    app.Event.on(app.Event.Switch, this.onSwitch, this);
  }
});
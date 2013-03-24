app.view.Switcher = Backbone.View.extend({
  events: {
    'click .activate': 'activate'
  },
  className: 'switcher',
  activate: function() {
    if (this.$el.hasClass('active')) {
      return;
    }
    this.$el.addClass('active');
    app.Event.trigger(app.Event.Switch, this.model);
  },
  doSwitch: function(task) {
    if (task.get('order') === this.model.get('order')) {
      return;
    }
    this.$el.removeClass('active');
  },
  initialize: function() {
    this.template = _.template($('#switcher').html());
    var totalHours = Math.round(this.model.get('total') / 60 * 100) / 100;
    this.$el.append(this.template({totalHours: totalHours}));
    var order = this.model.get('order');
    this.$el.addClass('task-order-' + order);
    if (order === 1) {
      this.$el.addClass('active');
    }
    app.Event.on(app.Event.Switch, this.doSwitch, this);
  }
});
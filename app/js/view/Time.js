app.view.Time = Backbone.View.extend({
  className: 'time',
  events: {
    'click .stop': 'stopTask'
  },
  stopTask: function() {
    this.model.stop(moment());
    this.model.save();
    this.remove();
  },
  render: function() {
    this.$el.append(this.template(this.model.attributes));
  },
  initialize: function() {
    this.template = _.template($('#time').html());
    this.render();
  }
});
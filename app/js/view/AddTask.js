app.view.AddTask = Backbone.View.extend({
  _adjustElementDisplay: function() {
    var tasksLength = this.collection.length;
    if (tasksLength > 3) {
      this.$el.hide();
    }
    this.$el.removeClass('task-order-' + tasksLength).
      addClass('task-order-' + (tasksLength + 1));
  },
  className: 'add-task-container',
  tagName: 'li',
  events: {
    'click .to-add-task': 'toAddTask',
    'submit form': 'addTask'
  },
  addTask: function(event) {
    event.preventDefault();
    this.collection.create({
      name: this.$el.find('.new-task-name').val(),
      order: this.collection.length + 1
    });
    this._adjustElementDisplay();
    this.$el.find('form').hide();
    this.$el.find('.add-task-title').show();
    this.$el.find('.add-task-markup').show();
  },
  toAddTask: function() {
    this.$el.find('form').show();
    this.$el.find('.add-task-title').hide();
    this.$el.find('.add-task-markup').hide();
    this.$el.find('.new-task-name').focus();
  },
  render: function() {
    this.$el.html(this.template());
    this._adjustElementDisplay(this.$el, this.collection);
  },
  initialize: function() {
    this.template = _.template($('#add_task').html());
    this.render();
  }
});


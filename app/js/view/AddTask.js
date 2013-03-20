(function() {
  function adjustElementDisplay($element, collection) {
    if (collection.length > 3) {
      $element.hide();
    }
  }

  app.view.AddTask = Backbone.View.extend({
    className: 'add-task-container',
    tagName: 'li',
    events: {
      'click .add-task': 'addTask'
    },
    addTask: function() {
      this.collection.create({
        name: this.$el.find('.new-task-name').val()
      });
      adjustElementDisplay(this.$el, this.collection);
    },
    render: function() {
      this.$el.html(this.template());
      adjustElementDisplay(this.$el, this.collection);
    },
    initialize: function() {
      this.template = _.template($('#add_task').html());
      this.render();
    }
  });
})();


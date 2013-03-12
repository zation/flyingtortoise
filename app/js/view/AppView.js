var AppView = Backbone.View.extend({
  initialize: function() {
    var appView = this;
    appView.$el.hide();
    $.get('/template/main.html', function(template) {
      appView.$el.append(template);
      appView.$el.show();
    });
  }
});
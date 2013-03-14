app.view.Main = Backbone.View.extend({
  initialize: function() {
    this.$el.hide();
  },
  setTemplate: function(template) {
    this.$el.append(template);
    this.$el.show();
  },
  initViews: function() {
    var home = new app.view.Home({
      collection: this.collection
    });
    this.$el.append(home.$el);
  }
});
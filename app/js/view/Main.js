app.view.Main = Backbone.View.extend({
  initialize: function() {
    this.$el.hide();
  },
  setTemplate: function(template) {
    this.$el.append(template);
    this.$el.show();
  },
  initViews: function() {
    var homeView = new app.view.Home({
      collection: this.collection
    });
    this.$el.append(homeView.$el);

    var timeView = new app.view.Time();
    this.$el.append(timeView.$el);

    var stateView = new app.view.State();
    this.$el.append(stateView.$el);
  }
});
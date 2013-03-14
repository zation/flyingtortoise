var app = {
  view: {},
  collection: {},
  model: {}
};

app.Manager = (function() {
  var manager = function() {
    this.mainCollection = new app.collection.Tasks();
    this.mainCollection.fetch();
    this.mainView = new app.view.Main({
      el: $('.app'),
      collection: this.mainCollection
    });
    this.loadTemplates();
  };

  manager.prototype.loadTemplates = function() {
    var mainView = this.mainView;
    $.get('/template/main.html', function(template) {
      mainView.setTemplate(template);
      mainView.initViews();
    });
  };

  return manager;
})();
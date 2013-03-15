app.collection.Tasks = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('database'),
  model: app.model.Task
});
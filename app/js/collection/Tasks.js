(function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  app.collection.Tasks = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('database'),
    model: app.model.Task,
    completeData: function(now) {
      var DATE_FORMAT = 'YYYY-MM-DD';
      this.each(function(task) {
        var records = task.get('records');
        if (records.length === 0) {
          return;
        }
        var lastDate = moment(_.last(records).date);
        if (lastDate.isSame(now, 'day')) {
          return;
        }
        while (!lastDate.add('day', 1).isSame(now, 'day')) {
          records.push({
            date: lastDate.format(DATE_FORMAT),
            time: task.get('total')
          });
        }
        task.save();
      });
    },
    create: function(model, options) {
      var _model = model;
      if(!_model) {
        _model = {};
      }
      if (!_model.id) {
        _model.id = guid();
      }
      return Backbone.Collection.prototype.create.call(this, _model, options);
    }
  });
})();


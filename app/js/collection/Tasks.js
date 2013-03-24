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
          time: 0
        });
      }
      task.save();
    });
  }
});
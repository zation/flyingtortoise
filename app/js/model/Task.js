(function() {
  var _startAt;
  var DATE_FORMAT = 'YYYY-MM-DD';

  function secondsForOneDay() {
    return 24 * 60 * 60;
  }

  function handleRecords(records, stopAt, fix) {
    if (records.length > 0) {
      var lastRecord = records[records.length - 1];
      if (lastRecord.date === _startAt.format(DATE_FORMAT)) {
        lastRecord.time += stopAt.diff(_startAt, 'seconds') + fix;
      }
      else {
        records.push({
          date: _startAt.format(DATE_FORMAT),
          time: stopAt.diff(_startAt, 'seconds') + fix
        });
      }
    }
    else {
      records = [
        {
          date: _startAt.format(DATE_FORMAT),
          time: stopAt.diff(_startAt, 'seconds') + fix
        }
      ];
    }
    return records;
  }

  app.model.Task = Backbone.Model.extend({
    defaults: {
      'order': 0,
      'name': 'no name',
      'records': []
    },

    start: function(startAt) {
      _startAt = startAt;
    },

    stop: function(stopAt) {
      var records = this.get('records');

      if (!stopAt.isSame(_startAt, 'day')) {
        var endOfStartAtDay = _startAt.clone().endOf('day');
        records = handleRecords(records, endOfStartAtDay, 1);
        var fullDays = stopAt.diff(endOfStartAtDay, 'days');
        for (var i = 0; i < fullDays; i++) {
          records.push({
            date: _startAt.clone().add('day', i + 1).format(DATE_FORMAT),
            time: secondsForOneDay()
          });
        }
        records.push({
          date: stopAt.format(DATE_FORMAT),
          time: stopAt.diff(stopAt.clone().startOf('day'), 'seconds')
        });
      }
      else {
        records = handleRecords(records, stopAt, 0);
      }
      this.set('records', records);
    }
  });
})();
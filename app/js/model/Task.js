(function() {
  var _startAt;
  var DATE_FORMAT = 'YYYY-MM-DD';

  function secondsForOneDay() {
    return 24 * 60 * 60;
  }

  function handleRecords(records, stopAt, total) {
    if (records.length > 0) {
      var lastRecord = _.last(records);
      if (lastRecord.date === _startAt.format(DATE_FORMAT)) {
        lastRecord.time += stopAt.diff(_startAt, 'seconds') + total;
      }
      else {
        records.push({
          date: _startAt.format(DATE_FORMAT),
          time: stopAt.diff(_startAt, 'seconds') + total
        });
      }
    }
    else {
      records = [
        {
          date: _startAt.format(DATE_FORMAT),
          time: stopAt.diff(_startAt, 'seconds') + total
        }
      ];
    }
    return records;
  }

  app.model.Task = Backbone.Model.extend({
    defaults: {
      'order': 0,
      'total': 0,
      'name': 'no name',
      'records': []
    },

    start: function(startAt) {
      _startAt = startAt;
    },

    stop: function(stopAt) {
      var records = this.get('records');
      var total = this.get('total');
      if (!stopAt.isSame(_startAt, 'day')) {
        var endOfStartAtDay = _startAt.clone().endOf('day').add('second', 1);
        records = handleRecords(records, endOfStartAtDay, total);
        total += _.last(records).time;
        var fullDays = stopAt.diff(endOfStartAtDay, 'days');
        for (var i = 0; i < fullDays; i++) {
          total += secondsForOneDay();
          records.push({
            date: _startAt.clone().add('day', i + 1).format(DATE_FORMAT),
            time: total
          });
        }
        total += stopAt.diff(stopAt.clone().startOf('day'), 'seconds');
        records.push({
          date: stopAt.format(DATE_FORMAT),
          time: total
        });
      }
      else {
        records = handleRecords(records, stopAt, total);
        total += _.last(records).time;
      }
      this.set('records', records);
      this.set('total', total);
    }
  });
})();
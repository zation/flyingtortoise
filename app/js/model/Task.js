(function() {
  var _startAt;
  var DATE_FORMAT = 'YYYY-MM-DD';

  function getSecondsByDay(day) {
    return day * 24 * 60 * 60;
  }

  function addRecord(records, date, time) {
    var lastRecord = records[records.length - 1];
    if (lastRecord.date === date) {
      lastRecord.time += time;
    }
    else {
      records.push({
        date: date,
        time: time
      });
    }
  }

  app.model.Task = Backbone.Model.extend({
    start: function(startAt) {
      _startAt = startAt;
    },

    stop: function(stopAt) {
      var records = this.get('records');
      var date = stopAt.format(DATE_FORMAT);

      if (!stopAt.isSame(_startAt, 'day')) {
        var endOfStartAtDay = _startAt.clone().endOf('day');
        if (records) {
          addRecord(records, _startAt.format(DATE_FORMAT), endOfStartAtDay.diff(_startAt, 'seconds') + 1);
        }
        else {
          records = [
            {
              date: _startAt.format(DATE_FORMAT),
              time: endOfStartAtDay.diff(_startAt, 'seconds') + 1
            }
          ];
        }
        var fullDays = stopAt.diff(endOfStartAtDay, 'days');
        for (var i = 0; i < fullDays; i++) {
          records.push({
            date: _startAt.clone().add('day', 1).format(DATE_FORMAT),
            time: getSecondsByDay(1)
          });
        }
        records.push({
          date: stopAt.format(DATE_FORMAT),
          time: stopAt.diff(stopAt.clone().startOf('day'), 'seconds')
        });
      }
      else {
        var time = stopAt.diff(_startAt, 'seconds');
        if (records) {
          addRecord(records, date, time);
        }
        else {
          records = [
            {
              date: date,
              time: time
            }
          ];
        }
      }
      this.set('records', records);
    }
  });
})();
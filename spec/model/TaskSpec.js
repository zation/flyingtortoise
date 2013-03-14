describe('Task Model', function() {
  describe('should record the time', function() {
    var taskModel;
    var now;
    var DATE_FORMAT = 'YYYY-MM-DD';
    beforeEach(function() {
      taskModel = new app.model.Task();
      now = moment('2000-1-1 23:59:50');
    });

    describe('when records exit', function() {
      it('and no previous date in the same day', function() {
        taskModel.set('records', [
          {
            date: now.clone().add('day', 1).format(DATE_FORMAT),
            time: 1
          }
        ]);
        taskModel.start(now);
        taskModel.stop(now.clone().add('second', 1));

        var records = taskModel.get('records');
        expect(records.length).toBe(2);
        expect(records[1].date).toBe(now.format(DATE_FORMAT));
        expect(records[1].time).toBe(1);
      });

      it('and has previous date in the same day', function() {
        taskModel.set('records', [
          {
            date: now.format(DATE_FORMAT),
            time: 1
          }
        ]);
        taskModel.start(now);
        taskModel.stop(now.clone().add('second', 1));

        var records = taskModel.get('records');
        expect(records.length).toBe(1);
        expect(records[0].date).toBe(now.format(DATE_FORMAT));
        expect(records[0].time).toBe(2);
      })
    });

    it('when records not exit', function() {
      taskModel.start(now);
      taskModel.stop(now.clone().add('second', 1));

      var records = taskModel.get('records');
      expect(records.length).toBe(1);
      expect(records[0].date).toBe(now.format(DATE_FORMAT));
      expect(records[0].time).toBe(1);
    });

    it('when stat date and end date are not in the same day', function() {
      var stopAt = now.clone().add('second', 11);
      taskModel.start(now);
      taskModel.stop(stopAt);

      var records = taskModel.get('records');
      expect(now.isSame(stopAt, 'day')).toBe(false);
      expect(records.length).toBe(2);
      expect(records[0].date).toBe(now.format(DATE_FORMAT));
      expect(records[0].time).toBe(10);
      expect(records[1].date).toBe(stopAt.format(DATE_FORMAT));
      expect(records[1].time).toBe(1);
    });
  });
});
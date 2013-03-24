describe('Task Model', function() {
  describe('should record the time', function() {
    var taskModel;
    var startAt;

    function secondsForDayOf(dayNumber) {
      return 24 * 60 * 60 * dayNumber;
    }

    beforeEach(function() {
      taskModel = new app.model.Task();
      startAt = moment('2000-01-02 23:59:50');
    });

    describe('when records exist', function() {
      it('and no previous data in the same day', function() {
        taskModel.set('total', 1);
        taskModel.set('records', [
          {
            date: '2000-01-01',
            time: 1
          }
        ]);
        taskModel.start(startAt);
        taskModel.stop(startAt.clone().add('second', 1));

        var records = taskModel.get('records');
        expect(records.length).toBe(2);
        expect(records[1].date).toBe('2000-01-02');
        expect(records[1].time).toBe(2);
        expect(taskModel.get('total')).toBe(2);
      });

      it('and has previous data in the same day', function() {
        taskModel.set('records', [
          {
            date: '2000-01-02',
            time: 1
          }
        ]);
        taskModel.start(startAt);
        taskModel.stop(startAt.clone().add('second', 1));

        var records = taskModel.get('records');
        expect(records.length).toBe(1);
        expect(records[0].date).toBe('2000-01-02');
        expect(records[0].time).toBe(2);
        expect(taskModel.get('total')).toBe(2);
      })
    });

    it('when records not exit', function() {
      taskModel.start(startAt);
      taskModel.stop(startAt.clone().add('second', 1));

      var records = taskModel.get('records');
      expect(records.length).toBe(1);
      expect(records[0].date).toBe('2000-01-02');
      expect(records[0].time).toBe(1);
      expect(taskModel.get('total')).toBe(1);
    });

    it('when stat date and end date are not in the same day', function() {
      var stopAt = startAt.clone().add('second', 11);
      taskModel.start(startAt);
      taskModel.stop(stopAt);

      var records = taskModel.get('records');
      expect(startAt.isSame(stopAt, 'day')).toBe(false);
      expect(records.length).toBe(2);
      expect(records[0].date).toBe('2000-01-02');
      expect(records[0].time).toBe(10);
      expect(records[1].date).toBe('2000-01-03');
      expect(records[1].time).toBe(11);
      expect(taskModel.get('total')).toBe(11);
    });

    it('when there are 3 days between stat date and end date', function() {
      var stopAt = startAt.clone().add('day', 3);
      taskModel.start(startAt);
      taskModel.stop(stopAt);

      var records = taskModel.get('records');
      expect(startAt.isSame(stopAt, 'day')).toBe(false);
      expect(records.length).toBe(4);
      expect(records[0].date).toBe('2000-01-02');
      expect(records[0].time).toBe(10);
      expect(records[1].date).toBe('2000-01-03');
      expect(records[1].time).toBe(secondsForDayOf(1) + 10);
      expect(records[2].date).toBe('2000-01-04');
      expect(records[2].time).toBe(secondsForDayOf(2) + 10);
      expect(records[3].date).toBe('2000-01-05');
      expect(records[3].time).toBe(secondsForDayOf(3));
      expect(taskModel.get('total')).toBe(secondsForDayOf(3));
    });
  });
});
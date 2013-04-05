describe('Tasks Collection', function() {
  it('should complete the data in the non-data days', function() {
    var now = moment('2001-02-14');
    var tasksCollection = new app.collection.Tasks();
    var taskModel = new app.model.Task({
      records: [
        {
          date: '2001-02-10',
          time: 10
        }
      ],
      total: 10
    });
    tasksCollection.add(taskModel);
    tasksCollection.completeData(now);

    var records = taskModel.get('records');
    expect(records.length).toBe(4);
    expect(records[1].date).toBe('2001-02-11');
    expect(records[1].time).toBe(10);
    expect(records[2].date).toBe('2001-02-12');
    expect(records[2].time).toBe(10);
    expect(records[3].date).toBe('2001-02-13');
    expect(records[3].time).toBe(10);
  });
});
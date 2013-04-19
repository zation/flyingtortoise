describe('Tasks Collection', function() {
  var now;
  var tasksCollection;

  beforeEach(function() {
    now = moment('2001-02-14');
    tasksCollection = new app.collection.Tasks();
  });

  it('should complete the data in the non-data days', function() {
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

  it('should keep current date when there is no non-data day', function() {
    var taskModel = new app.model.Task({
      records: [
        {
          date: '2001-02-14',
          time: 10
        }
      ],
      total: 10
    });
    tasksCollection.add(taskModel);
    tasksCollection.completeData(now);

    var records = taskModel.get('records');
    expect(records.length).toBe(1);
    expect(records[0].date).toBe('2001-02-14');
    expect(records[0].time).toBe(10);
  });

  it('should create model with guid when model does not contain id', function() {
    var taskModel = tasksCollection.create({});

    expect(taskModel.id).not.toBe(undefined);
  });

  it('should not create model with guid when model contains id', function() {
    var taskModel = tasksCollection.create({id: 'aaa'});

    expect(taskModel.id).toBe('aaa');
  });
});
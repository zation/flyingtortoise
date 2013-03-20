describe('AddTask View', function() {
  var collection;
  var addTaskView;

  beforeEach(function() {
    collection = new app.collection.Tasks();
    addTaskView = new app.view.AddTask({
      collection: collection
    });
  });

  it('should add task', function() {
    var expectedTaskName = 'expected task name';
    addTaskView.$el.find('.new-task-name').val(expectedTaskName);
    addTaskView.addTask();

    expect(collection.length).toBe(1);
    expect(collection.at(0).get('name')).toBe(expectedTaskName);
  });

  it('should hide when there are 4 tasks', function() {
    setFixtures(addTaskView.$el);
    add4Tasks();

    expect(addTaskView.$el).toBeHidden();
  });

  function add4Tasks() {
    for (var i = 0; i < 4; i++) {
      addTaskView.addTask();
    }
  }
});
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

  describe('should hide when there are 4 tasks', function() {
    it('after add task', function() {
      setFixtures(addTaskView.$el);
      add4TasksToView();

      expect(addTaskView.$el).toBeHidden();
    });

    it('after initialize', function() {
      add4TasksToCollection();
      addTaskView = new app.view.AddTask({
        collection: collection
      });
      setFixtures(addTaskView.$el);

      expect(addTaskView.$el).toBeHidden();
    });
  });

  function add4TasksToCollection() {
    collection.add([
      {},
      {},
      {},
      {}
    ]);
  }

  function add4TasksToView() {
    for (var i = 0; i < 4; i++) {
      addTaskView.addTask();
    }
  }
});
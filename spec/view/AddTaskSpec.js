describe('AddTask View', function() {
  it('should add task', function() {
    var collection = new app.collection.Tasks();
    var addTaskView = new app.view.AddTask({
      collection: collection
    });

    var expectedTaskName = 'expected task name';
    addTaskView.$el.find('.new-task-name').val(expectedTaskName);
    addTaskView.addTask();

    expect(collection.length).toBe(1);
    expect(collection.at(0).get('name')).toBe(expectedTaskName);
  });
});
describe('TaskList View', function() {
  it('should append task summary and add task view when initialize', function() {
    var collection = new app.collection.Tasks().add([{}, {}]);
    var taskListView = new app.view.TaskList({
      collection: collection
    });

    expect(taskListView.$el).toContain('.add-task-container');
    expect(taskListView.$el.find('.task-summary').length).toBe(2);
  });

  it('should re-render when collection is changed', function() {
    var collection = new app.collection.Tasks();
    var taskListView = new app.view.TaskList({
      collection: collection
    });
    collection.create({});
    collection.create({});

    expect(taskListView.$el.find('.task-summary').length).toBe(2);
  });
});
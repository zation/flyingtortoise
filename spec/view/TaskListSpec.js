describe('TaskList View', function() {
  it('should re-render when collection is changed', function() {
    var collection = new app.collection.Tasks();
    var taskListView = new app.view.TaskList({
      collection: collection
    });
    collection.create({
      name: 'some name'
    });
    collection.create({
      name: 'some name'
    });

    expect(taskListView.$el.find('.task-summary').length).toBe(2);
  });
});
describe('Home View', function() {
  var homeView;

  beforeEach(function() {
    spyOn(app.view.TaskList.prototype, 'initialize');
    homeView = new app.view.Home();
  });

  it('should append taskListView', function() {
    expect(homeView.$el).toContain('.task-list');
  });

  it('should hide when task start', function() {
    setFixtures(homeView.$el);
    app.Event.trigger(app.Event.TaskStart);

    expect(homeView.$el).toBeHidden();
  });
});
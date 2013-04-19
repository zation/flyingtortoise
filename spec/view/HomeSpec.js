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
    appendSetFixtures(homeView.$el);
    app.Event.trigger(app.Event.TaskStart, new app.model.Task());

    expect(homeView.$el).toBeHidden();
  });

  it('should show when task stop', function() {
    appendSetFixtures(homeView.$el);
    app.Event.trigger(app.Event.TaskStop);

    expect(homeView.$el).toBeVisible();
  });

  it('should hide view when screen is vertical and view is visible', function() {
    appendSetFixtures(homeView.$el);
    homeView.$el.show();
    app.Event.trigger(app.Event.Rotate, 90);

    expect(homeView.$el).toBeHidden();
  });

  it('should display view when screen is horizontal and task not started', function() {
    appendSetFixtures(homeView.$el);
    homeView.switchIn();
    homeView.$el.hide();
    app.Event.trigger(app.Event.Rotate, 0);

    expect(homeView.$el).toBeVisible();
  });
});
describe('Switchers View', function() {
  var switchersView;

  beforeEach(function() {
    var tasksCollection = new app.collection.Tasks({});
    switchersView = new app.view.Switchers({
      collection: tasksCollection
    });
  });

  it('should remove view when screen is rotated to vertical', function() {
    app.Event.trigger(app.Event.Rotate, 0);

    expect(switchersView.$el).not.toExist();
  });

  it('should append switcher view when initialize', function() {
    expect(switchersView.$el).toContain('.switcher');
  });
});


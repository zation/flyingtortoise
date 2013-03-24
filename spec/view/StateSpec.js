describe('State View', function() {
  var stateView;
  beforeEach(function() {
    stateView = new app.view.State();
  });
  it('should hide view when screen is vertical and view is visible', function() {
    setFixtures(stateView.$el);
    stateView.$el.show();
    app.Event.trigger(app.Event.Rotate, 0);

    expect(stateView.$el).toBeHidden();
  });

  it('should display view when screen is horizontal', function() {
    setFixtures(stateView.$el);
    stateView.$el.hide();
    app.Event.trigger(app.Event.Rotate, 90);

    expect(stateView.$el).toBeVisible();
  });
});
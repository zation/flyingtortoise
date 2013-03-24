describe('Main View', function() {
  var mainView;

  beforeEach(function() {
    spyOn(app.view.Home.prototype, 'initialize');
    spyOn(app.view.Time.prototype, 'initialize');
    spyOn(app.view.State.prototype, 'initialize');
    mainView = new app.view.Main();
  });

  it('initViews should initialize home view, time view and state view', function() {
    mainView.initViews();

    expect(mainView.$el).toContain('.home');
    expect(mainView.$el).toContain('.time');
    expect(mainView.$el).toContain('.state');
  });

  it('setTemplate should append template and display element', function() {
    setFixtures(mainView.$el);
    expect(mainView.$el).toBeHidden();

    var expectedTemplate = '<div></div>';
    mainView.setTemplate(expectedTemplate);

    expect(mainView.$el).toHaveHtml(expectedTemplate);
    expect(mainView.$el).toBeVisible();
  });

  it('should listen orientation change event', function() {
    spyOn(app.Event, 'trigger');
    var expectedOrientation = 90;
    specHelper.mockOrientation(this, expectedOrientation);
    $(window).trigger('orientationchange');

    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.Rotate, expectedOrientation);
  });
});
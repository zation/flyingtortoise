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

  //TODO: refactor orientationchange event
  xit('should listen orientation change event', function() {
    setFixtures(mainView.$el);
    window.orientation = 90;
    $(window).trigger('orientationchange');

    expect(mainView.$el.find('.home')).toBeHidden();
    expect(mainView.$el.find('.state')).toBeVisible();

    window.orientation = 0;
    $(window).trigger('orientationchange');

    expect(mainView.$el.find('.home')).toBeVisible();
    expect(mainView.$el.find('.state')).toBeHidden();
  });
});
describe('Main View', function() {
  var mainView;

  beforeEach(function() {
    spyOn(app.view.Home.prototype, 'initialize');
    mainView = new app.view.Main();
  });

  it('initViews should append homeView', function() {
    mainView.initViews();

    expect(mainView.$el).toContain('.home');
  });

  it('setTemplate should append template and display element', function() {
    setFixtures(mainView.$el);
    expect(mainView.$el).toBeHidden();

    var expectedTemplate = '<div></div>';
    mainView.setTemplate(expectedTemplate);

    expect(mainView.$el).toHaveHtml(expectedTemplate);
    expect(mainView.$el).toBeVisible();
  });
});
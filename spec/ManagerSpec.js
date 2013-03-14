describe('Manager', function() {
  it('should load template', function() {
    setFixtures('<div class="app"></div>');
    spyOn(app.view, 'Home');

    var manager = new app.Manager();

    var expectedHtml = '<div>Some Html</div>';
    var request = mostRecentAjaxRequest();
    request.responseWithContent(expectedHtml, 'text/html');

    expect(manager.mainView.$el).toHaveHtml(expectedHtml);
    expect(request).toHaveUrl('/template/main.html');
  });

  it('should fetch collection', function() {
    var expectedName = 'test';
    new app.collection.Tasks().create({
      name: expectedName
    }).save();
    var manager = new app.Manager();

    expect(manager.mainCollection.length).toBe(1);
    expect(manager.mainCollection.at(0).get('name')).toBe(expectedName);
  });
});
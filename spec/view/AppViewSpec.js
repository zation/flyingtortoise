describe('AppView', function() {
  describe('initialize', function() {
    it('should load template', function() {
      var appView = new AppView();

      var expectedHtml = '<div>Some Html</div>';
      var request = mostRecentAjaxRequest();
      request.responseWithContent(expectedHtml, 'text/html');

      expect(appView.$el).toHaveHtml(expectedHtml);
      expect(request).toHaveUrl('/template/main.html');
    });

    it('should show element', function() {
      setFixtures('<div class="app" style="display: none;"></div>');

      var appView = new AppView({
        el: $('.app')
      });
      mostRecentAjaxRequest().responseWithSuccess();

      expect(appView.$el).toBeVisible();
    });
  });
});
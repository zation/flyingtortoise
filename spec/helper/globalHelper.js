beforeEach(function() {
  jasmine.getFixtures().fixturesPath = 'app/template';
  loadFixtures('main.html');
  jasmine.Ajax.useMock();

  app.Event.off(app.Event.Rotate);

  this.addMatchers({
    toHaveUrl: function(url) {
      var fullUrl = this.actual.url;
      var actualUrl = fullUrl;
      if (fullUrl.indexOf("?") > 0) {
        actualUrl = fullUrl.substr(0, fullUrl.indexOf("?"));
      }
      return actualUrl == url;
    }
  });
});

mostRecentAjaxRequest = function() {
  if (ajaxRequests.length > 0) {
    var request = ajaxRequests[ajaxRequests.length - 1];

    request.responseWithContent = function(content, contentType) {
      contentType = contentType ? 'application/json' : contentType;
      this.response({
        responseText: JSON.stringify(content),
        contentType: contentType,
        status: 200
      });
    };

    request.responseWithSuccess = function() {
      this.response({
        contentType: 'application/x-www-form-urlencoded',
        status: 200
      });
    };

    return request;
  } else {
    return null;
  }
};

specHelper = {};
specHelper.mockOrientation = function(testCase, orientation) {
  var originOrientation = window.orientation;
  window.orientation = orientation;
  testCase.after(function() {
    window.orientation = originOrientation;
  });
};
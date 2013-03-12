beforeEach(function() {
  jasmine.Ajax.useMock();

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
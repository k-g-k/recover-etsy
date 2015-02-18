app.EtsyApi = function (spec) {
  // Displays Error message if no API is found
  if (!spec.apiKey) {
    throw new Error('An API key is required!');
  }

  var baseUrl = 'https://openapi.etsy.com/' + (spec.apiVersion || 'v2');

  function fetchUrl(url) {
    var promise = $.Deferred();

    var req = $.getJSON(url).done(function (data) {
      if (!data.ok) {
        // Keep our rejection in line with the standard jQuery
        // rejection, passing req as first argument, status as second
        // and error object as the third
        promise.reject(req, 'Unknown error', data);
      } else {
        promise.resolve(data);
      }
    });

    return promise;
  }

  var self = {
    listings: function () {
      var url = baseUrl + '/listings/active.js?includes=MainImage&api_key=' + spec.apiKey + '&callback=?';
      return fetchUrl(url);
    },

    userDetail: function (userId) {
      // users/:user_id/profile
      var url = baseUrl + '/users/' + userId + '/profile.js?includes=MainImage&api_key=' + spec.apiKey + '&callback=?';
      return fetchUrl(url);
    }
  };

  return self;
};

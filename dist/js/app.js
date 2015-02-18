// The namespace for this application
//define any globals that need access to our scripts
var app = {
  router: Rlite()
};

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

app.router.add('', function () {
  // Here, put logic that will display your
  // Etsy listings...
  var api = app.EtsyApi({ apiKey: 'y6twc9lq8w4rbpixvult61ti' });
  var listTemplate = _.template($('#etsyList').html(), { variable: 'm' });

  api.listings()
  .done(function (data) {
    // Let's put the data in the console so we can
    // explore it...
    console.log(data);
    $('.main-content').html(listTemplate({ items: data.results }));
  })
  .fail(function (req, status, err) {
    console.log(err);
    $('.main-content').text(err.error);
  });
});

app.pageNotFound = function () {
  $('.main-content').html('<h1>404 Not Found!</h1>');
};

app.router.add('profiles/:userId', function (url) {
  // Here, put logic that will display your
  // Etsy listings...
  var api = app.EtsyApi({ apiKey: 'y6twc9lq8w4rbpixvult61ti' });
  var profileTemplate = _.template($('#etsyProfile').html(), { variable: 'm' });

  api.userDetail(url.params.userId)
  .done(function (data) {
    // Let's put the data in the console so we can
    // explore it...
    console.log(data);
    $('.main-content').html(profileTemplate(data.results[0]));
  })
  .fail(function (req, status, err) {
    console.log(err);
    $('.main-content').html(err.error);
  });
});

// initializing the application, sets up the hash listener
// sets up hash watching
(function(){

  function processHash() {
                //location is url, and this is standard js
    var hash = location.hash || '#';
        //this is what makes the router run
    if (!app.router.run(hash.slice(1))) {
      app.pageNotFound();
    }
  }

  window.addEventListener('hashchange', processHash);
  processHash();

})();

//# sourceMappingURL=app.js.map
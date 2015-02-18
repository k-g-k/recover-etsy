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

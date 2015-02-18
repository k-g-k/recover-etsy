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

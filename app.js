// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://api.sqoot.com/v2/deals?api_key=DkDVEWgCHeXE-swLy6SD",
//   "method": "GET",

// }

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });



$(document).ready(function () {

  $(".js-search-form").submit(function () {
    var keyword = $('.js-keyword').val();
    var location = $('.js-location').val();
    var radius = $('.js-radius').val();
    var sqootUrl = 'https://api.sqoot.com/v2/deals?api_key=DkDVEWgCHeXE-swLy6SD&query=' + keyword + '&location=' + location + '&radius=' + radius;

    $.ajax({
      type: "GET",
      url: sqootUrl,
      dataType: "jsonp",
      success: function (response) {
        console.log(keyword, location, radius);
        console.log("this is our response", response);
        $('.js-results').html('');
        if (response.deals.length) {


          $.each(response.deals, function (i, data) {

            // data.deals
            var title = data.deal.title;
            var desc = data.deal.description;
            var url = data.deal.url;
            var final = "<div class='deals'><div class='title'><a href='" + url + "'>" + title + "</a></div><div class='description'>" + desc + "</div><div class='url'>" + url + "</div></div>";

            $('.js-results').append(final);

          });
        } else {
          $('.js-results').html("<div id='no'>No Results</div>");
        }
      }
    });
  });
});
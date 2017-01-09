
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
        console.log(response);
        $('.js-results').html('');
        if (response.deals.length) {
          $.each(response.deals, function (i, data) {
            if(data.deal.merchant.locality){
              var title = data.deal.title;
              var name = data.deal.merchant.name.toLowerCase().replace(".","").replace(/ /g,"-");
              var locality = data.deal.merchant.locality.toLowerCase().replace(".","").replace(/ /g,"-");
              var yelpsearch = name + "-" + locality;
              console.log(yelpsearch);
              var desc = data.deal.description;
              var url = data.deal.url;
              var img = data.deal.image_url;

              $.ajax({
                type: "GET",
                url: "https://quiet-springs-39660.herokuapp.com/api/business/"+yelpsearch,
                dataType: "json",
                success: function(yelpResponse){
                  console.log(yelpResponse);
                }
              });

              var final = "<div class='image'><img src='" + img + "'></div>"+"<div class='deals'><div class='title'><a href='" + url + "'>" + title + "</a></div><div class='description'>" + desc+ '</div>';

              $('.js-results').append(final);
            }
            

          });
        } else {
          $('.js-results').html("<div id='no'>No Results</div>");
        }
      }
    });
  });
});
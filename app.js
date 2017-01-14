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
              var name = data.deal.merchant.name.toLowerCase().replace(".","").replace(/ /g,"-");
              var locality = data.deal.merchant.locality.toLowerCase().replace(".","").replace(/ /g,"-");
              var yelpsearch = name + "-" + locality;
              console.log(yelpsearch);

              $.ajax({
                type: "GET",
                url: "https://quiet-springs-39660.herokuapp.com/api/business/"+yelpsearch,
                dataType: "json",
                success: function(yelpResponse) { 
                  if(yelpResponse.statusCode === 400) { 
                    yelpResponse.rating_img_url_large = "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/04ae5eda5622/ico/stars/v1/stars_0.png";

                  } else {
                  
                  console.log(yelpResponse);
                    var final = "<div class='row'><h3 class='col-md-2 box'>Company Website:</h3><h3 class='col-md-2 website'><a href='"+
                   data.deal.merchant.url+ 
                   "'>"+ 
                   data.deal.merchant.name+
                   "</a></h3></h3>"+
                   "<h3 class='col-md-2 box'>Company Location:</h3><h3 class='col-md-2 website'>"+
                   data.deal.merchant.locality+ 
                   "</h3></h3></div>"+
                   "<h3 class='col-md-2 box'>Company Rating:</h3><h3 class='col-md-2 website'><img src='"+
                   yelpResponse.rating_img_url_large+ 
                   "'></h3></h3></div>"+
                   "<div class='image'><img src='"+
                   data.deal.image_url+ "'></div><div class='deals'><div class='title'><a href='"+
                   data.deal.url+
                   "'>"+ 
                   data.deal.title+
                   "</a></div><div class='description'>"+
                   data.deal.description+
                   '</div></div><div class="rating">';
                 
     
                   $('.js-results').append(final);
                }
              }
              
              });


            }
          });
        } else {
          $('.js-results').html("<div id='no'>No Results</div>");
        }
      }
    });
  });
});
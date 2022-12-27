$(function() {

  // OnKeyDown Function
  $("#zip").keyup(function() {
    var zip_in = $(this);
    var zip_box = $('#zipbox');

    if (zip_in.val().length<5)
    {
      zip_box.removeClass('error success');
    }
    else if ( zip_in.val().length>5)
    {
      zip_box.addClass('error').removeClass('success');
    }
    else if ((zip_in.val().length == 5) )
    {

      // Make HTTP Request
      $.ajax({
        url: "https://api.zippopotam.us/us/" + zip_in.val(),
        cache: false,
        dataType: "json",
        type: "GET",
        success: function(result, success) {

          // US Zip Code Records Officially Map to only 1 Primary Location
          places = result['places'][0];
          $("#city").val(places['place name']);
          $("#state").val(places['state']);
          zip_box.addClass('success').removeClass('error');
        },
        error: function(result, success) {
          zip_box.removeClass('success').addClass('error');
        }
      });
    }
  });

});

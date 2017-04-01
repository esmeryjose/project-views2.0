function pictureAjax(x) {
  var route;

  !!x? route = x : route = getRoute();

  $.ajax({
    url: route,
    method: "GET",
    dataType: "json",
    success: response=>{
      $(".loader").hide();
      $("#yield").show();
      if (isShowPage(route)) {
        showPictureDisplay(response);
      } else {
        var newDiv = `
        <div id="indexPictures" class="containerIndex">
        </div>
        `
        interact("#yield",newDiv,"replace")
        collageDisplay(response);
      }
    },
    error: error=>{
      failResponse = new Error(error.responseJSON);
      displayErrors();
    }
  });
}

function collageDisplay(picturesArray){
  picturesArray.forEach(pic=>{
    photo = new Picture(pic)
    photo.displayPicture("indexPictures");
  });
}

$(document).on('turbolinks:load', ()=> {
    if ($(".users_views").length) {
      $(".loader").show();
      searchData ="";
      formSubmit();
      pictureAjax();
    }
});

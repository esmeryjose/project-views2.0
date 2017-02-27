function pictureAjax(x) {
  var route;
  !!x? route = x : route = getRoute();

  $.ajax({
    url: route,
    method: "GET",
    dataType: "json",
    success: response=>{
      if (isShowPage(route)) {
        showPictureDisplay(response);
      } else {
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
      searchData ="";
      formSubmit();
      pictureAjax();
    }
});

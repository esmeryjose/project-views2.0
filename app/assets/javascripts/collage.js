function pictureAjax(x) {
  var route;
  !!x? route = x : route = getRoute();

  $.ajax({
    url: route,
    method: "GET",
    dataType: "json",
    success: response=>{
      debugger;
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
  // currentUserId = picturesArray[0].user.current_user_id
  picturesArray.forEach(pic=>{
    // user = new User(pic.user)
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

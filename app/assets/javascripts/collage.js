function getIndexPictures() {
  $.ajax({
    url: getRoute(),
    method: "GET",
    dataType: "json",
    success: response=>{
      collageDisplay(response);
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
      getIndexPictures();
    }
});

function showPictureDisplay(picture) {
  clearYield();
  photo = new Picture(picture)
  photo.displayPicture("yield");
}

function isShowPage(route){
  if (route.split("/").includes("users") && route.split("/").includes("pictures")){
    return true
  } else {
    return false
  }
}

function attachShowPictureListerner() {
  $('#yield').on("click","img.showPicture", function(){
    // this.stopImmediatePropagation();
    var route  = this.className.split(" ")[1];
    pictureAjax(route);
  })
}

$(document).on("turbolinks:load", function (e) {
  // if ($(".pictures_show").length) {
  //   pictureAjax();
  // }
  attachShowPictureListerner();
})

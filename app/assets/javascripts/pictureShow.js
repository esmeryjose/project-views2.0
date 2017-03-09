function showPictureDisplay(picture) {
  clearYield();
  $('#yield').append("<div id='theShowPhoto'></div>")
  photo = new Picture(picture);
  // photo.changeTheClass();
  photo.displayPicture("theShowPhoto");
  photo.commentsBlock();
}

function isShowPage(route){
  if (route.split("/").includes("users") && route.split("/").includes("pictures")){
    return true
  } else {
    return false
  }
}

function attachShowPictureListerner() {
  $('#yield').on("click","img.showPicture", function(e){
    var route  = this.className.split(" ")[1];
    pictureAjax(route);
  });
}

function displayNewComment(comment) {
  var newComment = `
    <div class="comment ${comment.id}">
      <a href="/users/${comment.user.id}">${comment.user.name}:</a> ${comment.content}
    </div>
    <br>
  `;
  $('.allComments').prepend(newComment);
}

function clearComment() {
  $("#commentsForm")[0].children[0].value = ""
}

function attachCommentsFormListerner() {
  $('#yield').on("submit","#commentsForm", function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    var comment = this.children[0].value.trim();
    if (comment !== "") {
      var data = new FormData(this);
      commentSubmit(data);
    } else {
      var error = new Error({comment: "can't be blank"})
      error.displayErrors();
    }

  });
}

function commentSubmit(data) {
  $.ajax({
    url: "/comments",
    method: "POST",
    data: data,
    processData: false,
    contentType: false,
    success: response=>{
      displayNewComment(response)
      clearComment();
    },
    error: error=>{
      debugger;
    }
  });
}

$(document).on("turbolinks:load", ()=>{
  // attach a listerner to the comments form so that it can be submitted by
  // by ajax, return an instance of the comment and then append it to the
  // comments div also check to see if the comment is empty if it is
  // then user your error class
  attachCommentsFormListerner();
  attachShowPictureListerner();
})

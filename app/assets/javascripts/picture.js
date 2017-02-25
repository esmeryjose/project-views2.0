var theNewForm;

class Picture {
  constructor(responseObject) {
    this.id = responseObject.id;
    this.title  = responseObject.title;
    this.avatar = responseObject.avatar;
    this.tags = responseObject.tags;
    this.user = responseObject.user;
    this.location = responseObject.location;
    this.comments = responseObject.comments
  }

  makeButton(){
    var currentUserId = $('#currentUserId')[0].value
    if (currentUserId == this.user.id) {

    }
    return (`
      <button class="editButton ${this.id}">Edit</button>
      <button class="deleteButton ${this.id}">Delete</button>
    `)
  }

  makeComments(){
    var commentsHtml = "";

    if (this.comments) {
      commentsHtml = this.comments.map((comment)=>{
        return (
          `
            <div class="comment ${comment.id}">
              <a href="/users/${comment.user.id}">${comment.user.name}:</a> ${comment.content}
              <br><br>
            </div>
          `
            )
          })
    }
    $(".commentsBlock").html(commentsHtml);
  }

  commentsForm(){
    

  }

  pictureStructure(){
    var htmlButton, route = `/users/${this.user.id}/pictures/${this.id}`;
    // this is the route for the delete button action='/pictures/${this.id}' method="post"
    htmlButton = this.makeButton();
    var htmlPicture = `
      <div class="pictureBlock">
        <div class='picture ${this.id}'>
          ${this.title || ''}<br>
          ${this.location.title}, ${this.location.address}<br>
          <img class='showPicture ${route}' src='${this.avatar.url}'></a>
          <br>
          ${htmlButton}
          <br><br>
        </div>
        <div class="commentsBlock">
        </div>
        <div class="commentsForm">
        </div>

      </div>
    `
    return htmlPicture
  }

  displayPicture(id){
    $(`#${id}`).prepend(this.pictureStructure());
  }

}

function formSubmit() {
  $("#yield").on("submit","#nestedForm",function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var url = this.action.split("http://localhost:3000")[1];
    var formId = this.id;
    var formClass = this.className;
    var submitButtonId = this.children.submitButton.id
    var newData = new FormData(this);

    $.ajax({
      type: "POST",
      url: url,
      data: newData,
      processData: false,
      contentType: false,
      success: response=>{
        if (formClass === "new_picture") {
          postNewPicture(response, formId, submitButtonId);
        } else {
          postEditPicture();
        }
      },
      error: error=>{
        var failResponse = new Error(error.responseJSON);
        failResponse.displayErrors();
        clearForm(formId, submitButtonId);
      }
    })

  });
}

function postNewPicture(response, formId, submitButtonId) {
  var picture = new Picture(response);
  picture.displayPicture("thePictures");
  clearForm(formId, submitButtonId);
}

function postEditPicture() {
  if (searchData) {
    searchAjax(searchData)
  } else {

    var location = getRoute().split("/")[3];

    if (location !== "views") {
      var userShow = `
        <div class="userInfo">
        </div>
        <br>
        ${theNewForm.innerHTML}
        <br><br><br><br>
        <div id="thePictures">
        </div>
      `;
      $("#yield").html(`${userShow}`);
      getUser();
    } else {
      $("#yield").html("<div id='indexPictures'></div>");
      pictureAjax();
    }
  }
}

function displayPictureCollection(pictures,id) {
  pictures.forEach(pic=>{
    var photo = new Picture(pic);
    photo.displayPicture(id);
  });
}

$( document ).on('turbolinks:load', ()=> {
  if ($(".users_show").length) {
    searchData ="";``
    theNewForm = $("#nestedForm")[0];
    formSubmit();
  }
})

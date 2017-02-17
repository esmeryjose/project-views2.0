var currentUserId, theNewForm;

class Picture {
  constructor(responseObject) {
    this.id = responseObject.id;
    this.title  = responseObject.title;
    this.avatar = responseObject.avatar;
    this.tags = responseObject.tags;
    this.user = responseObject.user;
    this.location = responseObject.location;
  }

  pictureStructure(){
    var htmlButton = "";
    // this is the route for the delete button action='/pictures/${this.id}' method="post"
    if (currentUserId === this.user.id) {
      htmlButton = `
        <button class="editButton ${this.id}">Edit</button>
        <button class="deleteButton ${this.id}">Delete</button>
      `
    }

    var htmlPicture = `
      <div class='picture ${this.id}'>
        ${this.title || ''}<br>
        ${this.location.title}, ${this.location.address}<br>
        <a href='users/${this.user.id}/pictures/${this.id}'><img src='${this.avatar.url}'></a>
        <br>
        ${htmlButton}
        <br><br>
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
    var location = getRoute().split("/")[1];
    switch (location) {
      case "users":
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
        break;
      case "pictures":
        $("#yield").html("<div id='indexPictures'></div>");
        getIndexPictures();
        break;
      default:

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
    searchData ="";
    theNewForm = $("#nestedForm")[0];
    formSubmit();
  }
})

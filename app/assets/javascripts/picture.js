var currentUserId, theNewForm;

class Error {

  constructor(errorObject) {
    this.errorsArray = [];
    this.errorObject = errorObject ;
  }

  getMessages(){
    for (var key in this.errorObject) {
      this.errorsArray.push(`${key}: ${this.errorObject[key]}`)
    }
    return this.errorsArray;
  }

  displayErrors(){
    var errorList = "";
    this.getMessages().forEach(v=>{
      errorList+=`<li>${v}</li>`
    })
    $('.errors').html(errorList);
  }
}

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
    // this method defines the structure of the picture
    // it will get called by displayPicture and displaySearchPicture
    // it should return the string with the html of the picture
    var htmlButton = "";
    // this is the route for the delete button action='/pictures/${this.id}' method="post"
    if (currentUserId === this.user.id) {
      // <input type="submit" value="edit">
      //   <input type="submit" value="delete">
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

class User{
  constructor(responseObject){
    this.id = responseObject.id;
    this.name = responseObject.name;
    this.email = responseObject.email;
    this.quote = responseObject.quote;
    this.pictures = responseObject.pictures;
  }

  displayUser(){
    var htmlUserInfo = `
      <h1>${this.name}</h1>
      <h2>${this.email}</h2>
    `
    $('.userInfo').append(htmlUserInfo);

    this.pictures.forEach(pic=>{
      var photo = new Picture(pic)
      photo.displayPicture("thePictures");
    });
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

function getUser() {
  $.ajax({
    url: getRoute(),
    method: "GET",
    dataType: "json",
    success: response=>{
      currentUserId = response.current_user_id
      var user = new User(response)
      user.displayUser();
    },
    error: error=>{
      var failResponse = new Error(error.responseJSON);
      failResponse.displayErrors();
    }
  });
}

function getRoute() {
  return window.location.href.toString().split(window.location.host)[1]
}

function clearForm(formId, submitButtonId) {
  $(`#${formId}`)[0].reset();
  $(`#${submitButtonId}`).prop('disabled',false);
}

$( document ).on('turbolinks:load', ()=> {
  if ($(".users_show").length) {
    searchData ="";
    theNewForm = $("#nestedForm")[0];
    formSubmit();
    getUser();
  }
})

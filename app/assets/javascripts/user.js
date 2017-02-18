class User{
  constructor(responseObject){
    this.id = responseObject.id;
    this.name = responseObject.name;
    this.email = responseObject.email;
    this.quote = responseObject.quote;
    this.pictures = responseObject.pictures;
  }

  makeButton(availability){
    var buttonName;
    switch (availability) {
      case "not following":
        buttonName = "Follow";
        break;

      case "resquest sent":
        buttonName = "Cancel Request";
        break;

      case "following":
        buttonName = "Unfollow";
        break;
      default:
    }

    return `<button class="searchUserButton ${this.id}">${buttonName}</button>`;
  }

  displaySearchUser(availability){
    var button= "";
    if (this.id !== currentUserId) {
      button = this.makeButton(availability);
    }
    var theDivs = `
      <div class = "searchU">
        <a href="/users/${this.id}">${this.name}</a>${button}
      <div>
      <br><br>
    `
    $('#yield').prepend(theDivs);
  }

  displayUser(){
    var htmlUserInfo = `
      <h1>${this.name}</h1>
      <h2>${this.email}</h2>
    `
    $('.userInfo').append(htmlUserInfo);
    displayPictureCollection(this.pictures,"thePictures")
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

$( document ).on('turbolinks:load', ()=> {
  if ($(".users_show").length) {
    getUser();
  }
})

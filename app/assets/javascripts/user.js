class User{
  constructor(responseObject){
    this.id = responseObject.id;
    this.name = responseObject.name;
    this.email = responseObject.email;
    this.quote = responseObject.quote;
    this.pictures = responseObject.pictures;
  }

  makeButton(availability){
    var buttons = "";
    availability.forEach(name=>{
      switch (name) {
        case "not following":
        buttons += `<button class="userButton ${this.id}">Follow</button>`;
        break;

        case "resquest sent":
        buttons += `<button class="userButton ${this.id}">Cancel Request</button>`;
        break;

        case "following":
        buttons += `<button class="userButton ${this.id}">Unfollow</button>`;
        break;

        case "accept":
        buttons += `<button class="userButton ${this.id}">Accept</button>`;
        break;

        case "decline":
        buttons += `<button class="userButton ${this.id}">Decline</button>`;
        break;

        default:
      }
    })

    return buttons;
  }

  makeUser(arrayButtonDesign){
    var buttons= "";
    var currentUserId = $('#currentUserId')[0].value
    if (this.id != currentUserId) {
      buttons = this.makeButton(arrayButtonDesign);
    }
    var theDivs = `
      <div class = "searchU ${this.id}">
        <a href="/users/${this.id}">${this.name}</a>${buttons}
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
    $('.userInfo').html("")
    $(`#thePictures`).html("")
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

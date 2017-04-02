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
        buttons += `<button class="userButton ${this.id} ui basic green button">Follow</button>`;
        break;

        case "resquest sent":
        buttons += `<button class="userButton ${this.id} ui basic red button">Cancel Request</button>`;
        break;

        case "following":
        buttons += `<button class="userButton ${this.id} ui basic red button">Unfollow</button>`;
        break;

        case "accept":
        buttons += `<button class="userButton ${this.id} ui basic green button">Accept</button>`;
        break;

        case "decline":
        buttons += `<button class="userButton ${this.id} ui basic red button">Decline</button>`;
        break;

        default:
      }
    })

    return buttons;
  }

  construcButtons(arrayButtonDesign){
    var buttons = "";
    this.buttonClass = "ui two buttons";
    if (this.id != theCurrentUserId()) {
      buttons = this.makeButton(arrayButtonDesign);
    }
    this.buttons =  buttons;
  }

  makeDescription(){
    var description = `${this.name} requested permission to Follow you`;

    if ( this.buttons.includes("Follow") || this.buttons.includes("Unfollow") || this.buttons.includes("Cancel Request")) {

        this.buttonClass = "ui one buttons";
        description = "";
    }
    return description;
  }

  makeUser(arrayButtonDesign){
    this.construcButtons(arrayButtonDesign);
    var description = this.makeDescription();
    var requestCards = `
      <div class="${this.id} ui cards request">
        <div class="card">
          <div class="content">
            <div class="searchU ${this.id} header">
              <a href="/users/${this.id}">${this.name}</a>
            </div>
            <div class="description">
              ${description}
            </div>
          </div>
          <div class="extra content">
            <div class='${this.buttonClass}'>
              ${this.buttons}
            </div>
          </div>
        </div>
      </div>
    `;
    interact(".requestContainer",requestCards,"prepend")
    $(`.${this.id}.ui.cards`).transition('vertical flip',"1000ms")
    // $('#yield').prepend(theDivs);
  }

  displayUser(){
    var htmlUserInfo = `
      <h1>${this.name}</h1>

      <button type="button" name="button" id="someButton">Post Picture</button>
    `;
    $('.userInfo').html("");
    $(`#thePictures`).html("");
    $('.userInfo').append(htmlUserInfo);
    displayPictureCollection(this.pictures,"thePictures","users_show");

  }
}

function getUser() {
  $.ajax({
    url: getRoute(),
    method: "GET",
    dataType: "json",
    success: response=>{
      $(".loader").hide();
      var user = new User(response)
      user.displayUser();
    },
    error: error=>{
      var failResponse = new Error(error.responseJSON);
      failResponse.displayErrors();
    }
  });
}

function attachModalListerner(){
  $("#yield").on("click","#someButton",()=>{
    $('#nestedForm')
    .modal({inverted: true})
    .modal('show');
  });

}



$( document ).on('turbolinks:load', ()=> {
  attachModalListerner();
  if ($(".users_show").length) {
    $(".loader").show();
    getUser();
  }
})

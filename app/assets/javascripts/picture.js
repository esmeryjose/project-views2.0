var theNewForm;

class Picture {
  constructor(responseObject, itemClass) {
    this.id = responseObject.id;
    this.date = this.parseDate(responseObject.created_at)
    this.title  = responseObject.title;
    this.avatar = responseObject.avatar;
    this.tags = responseObject.tags;
    this.user = responseObject.user;
    this.location = responseObject.location;
    this.comments = responseObject.comments
    this.itemClass = itemClass;
  }

  parseDate(date){
    var newDate = new Date(date).toString().split(" ")
    newDate = `${newDate[1]} ${newDate[2]}, ${newDate[3]}`
    return newDate
  }

  makeButton(){
    var currentUserId = theCurrentUserId(), buttons ="";
    if (currentUserId == this.user.id) {
      buttons = `
        <div class="ui buttons">
          <button class="ui button editButton ${this.id}">Edit</button>
          <div class="or"></div>
          <button class="ui button deleteButton ${this.id}">Delete</button>
        </div>
        <br>
      `
    }
    return buttons
  }

  makeTags(){
    var tags = "", tagContainer;
    if (this.tags) {
      this.tags.forEach(tag=>{
        tags+=`<span class="label label-primary tag">${tag.title}</span>`
      })
    }
    tagContainer = `<div class="tagContainer">${tags}</div>`;

    return tagContainer;
  }

  makeComments(){
    var commentsHtml,
        allComments = "<div class='allComments'></div>";

    if (this.comments) {
      commentsHtml = this.comments.map((comment)=>{
        return (
          `
            <div class="comment ${comment.id}">
              <a href="/users/${comment.user.id}">${comment.user.name}:</a> ${comment.content}
            </div>
            <br>
          `
        )
      });
      commentsHtml = commentsHtml.reverse().join("")
      allComments = `<div class='allComments'>${commentsHtml}</div>`;
    }
    return allComments;
  }

  commentsForm(){
    var form = `
    <form action="/comments" method="post" id="commentsForm">
      <input class="commentInput" type="text" name="comments[content]">
      <input type="hidden" name="comments[picture_id]" value="${this.id}">
      <input class="ui grey basic button" type="submit" value="Submit">
    </form>
    `;
    return form;
  }

  commentsBlock(){
    var theBlock = `${this.makeComments()}${this.commentsForm()}`
    $(".commentsBlock").html(theBlock)
  }

  changeTheClass(){
    this.changeClass = true;
  }

  makeItemClass(){
    var showClass = "", bodyClass = $('body')[0].className;

    if (bodyClass === "users_show" && !!this.itemClass) {
      showClass = "UserShow";
    }

    return showClass;
    // its going to return the class of the item
  }
  pictureStructure(){
    var htmlTags,htmlButton, showClass = "", bodyClass, itemClass,
        route = `/users/${this.user.id}/pictures/${this.id}`;
    // this is the route for the delete button action='/pictures/${this.id}' method="post"
    htmlButton = this.makeButton();
    htmlTags = this.makeTags();
    itemClass = this.makeItemClass();
    var htmlPicture = `
          <div class="ui card item${itemClass}">
            <div class="content">
              <div class="right floated meta">${this.date}</div>
              <a class="userName" href="/users/${this.user.id}">${this.user.name}</a>
            </div>
            <div class="extra content">
              ${this.location.title}, ${this.location.address}
            </div>
            <div class="image">
              <img class='showPicture ${route}' src='${this.avatar.url}'></a>
            </div>
            <div class="content">
              ${this.title || ''}
            </div>
            <div class="theTags">
              ${htmlTags}
            </div>
            ${htmlButton}
            <div class="commentsBlock">
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
    e.stopPropagation();
    e.stopImmediatePropagation();
    var url = this.action.split("http://localhost:3000")[1];
    var formId = this.id;
    var formClass = this.className;
    var submitButtonId = $("#submitButton")[0].id
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
        <br>
        <div id="thePictures" class="containerShow">
        </div>
      `;
      // $("#yield").html(`${userShow}`);
      interact("#yield",userShow,"replace")
      getUser();
    } else {
      // $("#yield").html("<div id='indexPictures'></div>");
      var content = "<div id='indexPictures'></div>";
      interact("#yield",content,"replace")
      pictureAjax();
    }
  }
}

function displayPictureCollection(pictures,id, someClass) {
  pictures.forEach(pic=>{
    var photo = new Picture(pic,someClass);
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

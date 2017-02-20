var searchData, searchType;

function attachSearchListener(searchAjax) {
  $("#searchForm").on('submit', function(e){
    e.preventDefault();
    searchWord = $(this).context.elements[1].value.trim();
    if (searchWord !== "") {
      searchType = this.childNodes[2].children[1].value;
      searchData = new FormData(this);
      searchAjax(searchData);
    }else {
      searchData = "";
      var error = new Error({search: "can't be blank"})
      error.displayErrors();
    }
    // this clears the form and also
    // returns false so that the search button unclicks
    $("#searchForm")[0].elements[1].value = "";
    return false;
  });

}

function searchAjax(data) {
  $.ajax({
    url: '/searchPicture',
    method: 'POST',
    data: searchData,
    processData: false,
    contentType: false,
    success: response=>{
      clearYield();
      if (searchType === "User") {
        displaySearchUsers(response);
      } else {
        displaySearch(response);
      }
    },
    error: error=>{
      searchWord = ""
      var failResponse = new Error (error.responseJSON);
      failResponse.displayErrors();
    }
  });
}

function displaySearchUsers(response) {
  var someUser
  response.forEach(object=>{
    someUser = new User(object.user)
    someUser.makeUser([object.availability])
  });
}

function displaySearch(response) {
  searchObjectId = 1;
  response.forEach(obj=>{
    if (obj.pictures.length > 0) {
      locationTag = new LocationTag(obj, searchObjectId)
      locationTag.displayObject();
      searchObjectId +=1;
    }
  });

}

function attachUserButtonListerner() {
  $('#yield').on("click",".userButton", function (e) {
    e.stopImmediatePropagation();
    var currentUserId = $('#currentUserId')[0].value
    var url =`/users/${currentUserId}/association`,
      otherUserId = this.className.split(" ")[1],
      data = {"otherUserId":`${otherUserId}`},
      relation = this.innerText,
      userButtonClass = this.className;

    data["relation"] = relation;
    association(url,data,userButtonClass);

  });
}

function association(url,data,userButtonClass) {
  $.ajax({
    url: url,
    method: 'POST',
    data: data,
    success: response=>{
      associationResponse(response,userButtonClass)
    },
    error: error=>{
      debugger;
    }
  });
}

function associationResponse(response,userButtonClass) {
  var buttonClass;
  if (response.user === "request was sent") {
    buttonClass = userButtonClass.replace(" ",".");
    $(`.${buttonClass}`)[0].innerHTML = "Cancel Request";

  } else if (response.user === "request was cancelled") {
    buttonClass = userButtonClass.replace(" ",".");
    $(`.${buttonClass}`)[0].innerHTML ="Follow";

  } else {
    var divClass = userButtonClass.replace("userButton","searchU");
    divClass = divClass.replace(" ",".");
    $(`.${divClass}`)[0].remove();
  }
}

$(document).on('turbolinks:load',()=>{
  attachUserButtonListerner();
  formSubmit();
  attachSearchListener(searchAjax);
});

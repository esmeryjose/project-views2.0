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
    someUser.displaySearchUser(object.availability)
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
  $('#yield').on("click",".searchUserButton", function (e) {
    debugger;
    var url =`/users/${currentUserId}/`;
    var otherUserId = this.className.split(" ")[1];
    var data = {"otherUserId":`${otherUserId}`};
    var relation = this.innerText;
    var userDivClass = this.className;

    if (relation == "Follow") {
      data["relation"] = "follow"
      association(url,data,userDivClass);
    } else {
      data["relation"] = "delete"
      association(url,data,userDivClass);
    }

  });
}

function association(url,data,userDivClass) {
  url = url + "initiateAssociation"

  $.ajax({
    url: url,
    method: 'POST',
    data: data,
    success: response=>{
      if (response.user === "request was sent") {
        div = userDivClass.replace(" ",".");
        $(`.${div}`)[0].innerHTML = "Cancel Request";
      } else {
        div = userDivClass.replace(" ",".");
        $(`.${div}`)[0].innerHTML ="Follow";
      }

    },
    error: error=>{
      debugger;
    }
  });
}

$(document).on('turbolinks:load',()=>{
  attachUserButtonListerner();
  formSubmit();
  attachSearchListener(searchAjax);
});

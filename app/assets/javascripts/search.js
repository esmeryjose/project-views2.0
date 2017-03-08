var searchData, searchType;

function attachSearchFormListener() {
  $("#searchForm").on('submit', function(e){

    // this clears the form and also
    // returns false so that the search button unclicks
    searchDeligator(e,this);
    clearSearchForm();
    return false;
  });
}

function attachSearchIconListener(){
  $("#searchInputIcon").on("click", function(e) {
    var form = this.parentElement.parentElement;
    searchDeligator(e,form);
    clearSearchForm();
  });
}

function searchDeligator(e,block) {
  e.preventDefault();
  searchWord = $(block)[0].children[1].children[0].value.trim();
  if (searchWord !== "") {
    searchType = block.children[2].children[0].value
    searchData = {
      search: searchType,
      type: searchWord
    }
    searchAjax(searchData);
  }else {
    searchData = "";
    var error = new Error({search: "can't be blank"})
    error.displayErrors();
  }
}

function searchAjax(data) {
  $.ajax({
    url: '/searchPicture',
    method: 'POST',
    data: data,
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
  $("#yield").append("<div id='searchCollection' class='containerSearch'></div>")
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
    var currentUserId = theCurrentUserId();
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

(function(){
	var customSelects = document.querySelectorAll(".custom-dropdown__select");
	for(var i=0; i<customSelects.length; i++){
		if (customSelects[i].hasAttribute("disabled")){
			customSelects[i].parentNode.className += " custom-dropdown--disabled";
		}
	}
})()


$(document).on('turbolinks:load',()=>{
  attachUserButtonListerner();
  formSubmit();
  attachSearchFormListener();
  attachSearchIconListener();
});

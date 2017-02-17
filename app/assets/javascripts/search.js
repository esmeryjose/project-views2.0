var searchData, searchType;

function attachSearchListener(searchAjax) {
  $("#searchForm").on('submit', function(e){
    e.preventDefault();
    searchWord = $(this).context.elements[1].value.trim();
    if (searchWord !== "") {
      searchType = this.childNodes[2].children[1].value
      searchData = new FormData(this);
      searchAjax(searchData);
    }else {
      searchData = ""
      var error = new Error({search: "can't be blank"})
      error.displayErrors();
    }
    // this clears the form and also
    // returns false so that the search button unclicks
    $("#searchForm")[0].elements[1].value = ""
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
  debugger;
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

$(document).on('turbolinks:load',()=>{
  formSubmit();
  attachSearchListener(searchAjax);
});

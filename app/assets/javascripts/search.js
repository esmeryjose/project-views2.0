var searchData;

function attachSearchListener(searchAjax) {
  $("#searchForm").on('submit', function(e){
    e.preventDefault();
    searchWord = $(this).context.elements[1].value.trim();
    if (searchWord !== "") {
      searchData = new FormData(this)
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
      displaySearch(response);
    },
    error: error=>{
      searchWord = ""
      var failResponse = new Error (error.responseJSON);
      failResponse.displayErrors();
    }
  });
}

function displaySearch(response) {
  // You are going to get an array of objects back
  // You will have to make a title div to put the titles and then
  // under the div you will have a div that will display the pictures in it
  // there will be a title div for every object in the response array
  debugger;
  searchObjectId = 1;
  response.forEach(obj=>{
    if (obj.pictures.length > 0) {
      var address = ``;
      if (obj.address) {
        address = `, ${obj.address}`
      }
      objectInfo = `${obj.title}${address}`;

      responseDiv = `
      <div id="searchObject${searchObjectId}" class="searchObject">
        <h2 class="objectInfo">${objectInfo}</h2>
        <div id="picturesSearched${searchObjectId}"  class="picturesSearched">
        </div>
      </div>
      <br>---------------------------------
        --------------------------------------------------------------------<br>
      `;
      $('#yield').prepend(responseDiv);

      displaySearchPictures(obj.pictures,`picturesSearched${searchObjectId}`);

      searchObjectId +=1;
    }
  });

}

function displaySearchPictures(pictures,id) {
  pictures.forEach(pic=>{
    var photo = new Picture(pic);
    photo.displayPicture(id);
  });

}

function clearYield(){
  $('#yield').html("");
}

$(document).on('turbolinks:load',()=>{
  formSubmit();
  attachSearchListener(searchAjax);
});

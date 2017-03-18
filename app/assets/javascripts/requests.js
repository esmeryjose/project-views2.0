function getRequests() {
  currentUserId = theCurrentUserId();
  var url = `/users/${currentUserId}/follower_requests`
  $.ajax({
    url:url,
    method:'GET',
    dataType:'json',
    success: response=>{
      $(".loader").hide();
      createRequestUser(response)
    },
    error: error=>{
    }
  })
}

function createRequestUser(response) {
  var buttonNames = ["accept","decline"];
  interact("#yield","<div class='requestContainer'></div>","replace")
  var someUser;
  response.forEach(user=>{
    someUser = new User(user)
    someUser.makeUser(buttonNames)
  });
}

$( document ).on('turbolinks:load', ()=> {
  if ($(".users_follower_requests").length) {
    $(".loader").show();
    attachUserButtonListerner()
    getRequests();
  }
})

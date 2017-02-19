function getRequests() {
  var url = `/users/${currentUserId}/follower_requests`
  $.ajax({
    url:url,
    method:'GET',
    dataType:'json',
    success: response=>{
      createRequestUser(response)
    },
    error: error=>{
      debugger;
    }
  })
}

function createRequestUser(response) {
  var buttonNames = ["accept","decline"];
  var someUser;
  response.forEach(user=>{
    someUser = new User(user)
    someUser.makeUser(buttonNames)
  });
}

$( document ).on('turbolinks:load', ()=> {
  if ($(".users_follower_requests").length) {
    attachUserButtonListerner()
    getRequests();
  }
})

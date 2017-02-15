var theYield;

function editClicked() {
  $("#yield").on("click",".editButton", function(){
    var picId = this.className.split(" ")[1];
    var url = `/pictures/${picId}/edit`
    $.ajax({
      url: url,
      method: "Get",
      dataType: "text",
      success: response=>{
        var editForm = response.split(`<input type="hidden" name="parseForm">`)[1];
        replaceYield(editForm);
      },
      error: error=>{
        debugger;
      }
    })

  });
}

function replaceYield(editForm) {
  // theYield = document.getElementById("yield").cloneNode(true);
  // debugger;
  $('#yield').html(editForm);
}

$(document).on('turbolinks:load', ()=> {
  editClicked();
});

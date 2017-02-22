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

      }
    })

  });
}

function replaceYield(editForm) {
  // theYield = document.getElementById("yield").cloneNode(true);
  $('#yield').html(editForm);
}

$(document).on('turbolinks:load', ()=> {
  editClicked();
});

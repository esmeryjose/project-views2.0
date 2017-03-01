function editClicked() {
  $("#yield").on("click",".editButton", function(e){
    var picId = this.className.split(" ")[1];
    var url = `/pictures/${picId}/edit`
    $.ajax({
      url: url,
      method: "Get",
      dataType: "text",
      success: response=>{
        var editForm = response.split(`<input type="hidden" name="parseForm">`)[1];
        interactYield(editForm,"replace");

      },
      error: error=>{

      }
    })

  });
}

function deleteClicked() {
  $("#yield").on("click",".deleteButton", function(e){
    var picId = this.className.split(" ")[1];
    var url = `/pictures/${picId}`
    $.ajax({
      url: url,
      method: "DELETE",
      success: response=>{
        $(`.${response.picture}`).remove()
      },
      error: error=>{

      }
    })

  });
}

$(document).on('turbolinks:load', ()=> {
  editClicked();
  deleteClicked();
});

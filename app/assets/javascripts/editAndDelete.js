function editClicked() {
  $("#yield").on("click",".editButton", function(e){
    debugger;
    var picId = this.className.split(" ")[3];
    var url = `/pictures/${picId}/edit`
    $.ajax({
      url: url,
      method: "Get",
      dataType: "text",
      success: response=>{
        var editForm = response.split(`<input type="hidden" name="parseForm">`)[1];
        interact("#yield",editForm,"replace");

      //   $('.ui.modal')
      //   .modal({
      //     inverted: true
      //   })
      //   .modal('show')
      // ;

        $(".ui.modal").show()

      },
      error: error=>{

      }
    })

  });
}


function deleteClicked() {
  $("#yield").on("click",".deleteButton", function(e){
    var picId = this.className.split(" ")[3];
    var url = `/pictures/${picId}`
    $.ajax({
      url: url,
      method: "DELETE",
      success: response=>{
        if (searchData) {
          searchAjax(searchData)
        } else {
          location.reload();
          $(`.${response.picture}`).parent().remove()
        }
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

function editClicked() {
  $("#yield").on("click",".editButton", function(e){
    var picId = this.className.split(" ")[3];
    var url = `/pictures/${picId}/edit`
    $.ajax({
      url: url,
      method: "Get",
      dataType: "text",
      success: response=>{
        var editForm = response.split(`<input type="hidden" name="parseForm">`)[1];
        interact("#yield",editForm,"append");

        $('.ui.modal')
        .modal({
          inverted: true
        })
        .modal('show');
        
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
        $(`.${response.picture}`).transition('fly right','1000ms');;
        setTimeout(()=>{ $(`.${response.picture}`).remove(); }, 2000);
        // if (searchData) {
        //   searchAjax(searchData)
        // } else {
        //   $(`.${response.picture}`).transition('fly right','1000ms');;
        //   setTimeout(()=>{ $(`.${response.picture}`).remove(); }, 2000);
        // }
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

class Error {

  constructor(errorObject) {
    this.errorsArray = [];
    this.errorObject = errorObject ;
  }

  getMessages(){
    for (var key in this.errorObject) {
      this.errorsArray.push(`${key}: ${this.errorObject[key]}`)
    }
    return this.errorsArray;
  }

  displayErrors(){
    var errorList = "";
    this.getMessages().forEach(v=>{
      errorList+=`<li>${v}</li>`
    });
    $('.errors').html(errorList);
  }
}

function interact(target,content,expression) {
  switch (expression) {
    case "replace":
      $(`${target}`).html(content);
      break;

    case "append":
      $(`${target}`).append(content);
      break;

    case "prepend":
      $(`${target}`).prepend(content);
      break;

    default:

  }
}



function getRoute() {
  return window.location.href.toString().split(window.location.host)[1]
}

function clearForm(formId, submitButtonId) {
  $(`#${formId}`)[0].reset();
  $(`#${submitButtonId}`).prop('disabled',false);
}

function clearYield(){
  $('#yield').html("");
}

function theCurrentUserId(){
  return $('#currentUserId')[0].value;
}

function clearSearchForm() {
  $("#searchForm")[0].elements[1].value = "";
}

function createInside() {

}

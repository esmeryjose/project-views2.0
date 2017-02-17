class LocationTag{
  constructor(obj,searchObjectId){
    this.title = obj.title;
    obj.address ? this.address = `, ${obj.address}` : this.address = "";
    this.pictures = obj.pictures;
    this.searchObjectId = searchObjectId;
  }

  htmlStructure(){

    var objectInfo = `${this.title}${this.address}`;

    var htmlObject = `
      <div id="searchObject${this.earchObjectId}" class="searchObject">
        <h2 class="objectInfo">${objectInfo}</h2>
        <div id="picturesSearched${this.searchObjectId}"  class="picturesSearched">
        </div>
      </div>
      <br>------------------------------------------------------------------<br>
    `;

    return htmlObject;

  }
  displayObject(){
    $('#yield').prepend(this.htmlStructure());
    displayPictureCollection(this.pictures, `picturesSearched${this.searchObjectId}`);
  }

}

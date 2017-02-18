class LocationTag{
  constructor(obj){
    this.title = obj.title;
    obj.address ? this.address = `, ${obj.address}` : this.address = "";
    this.pictures = obj.pictures;
    // this.searchObjectId = searchObjectId;
  }

  htmlStructure(){

    var objectInfo = `${this.title}${this.address}`;

    var htmlObject = `
      <div class="searchObject">
        <h2 class="objectInfo">${objectInfo}</h2>
        <div id="picturesSearched${this.id}"  class="picturesSearched">
        </div>
      </div>
      <br>------------------------------------------------------------------<br>
    `;

    return htmlObject;

  }
  displayObject(){
    $('#yield').prepend(this.htmlStructure());
    displayPictureCollection(this.pictures, `picturesSearched${this.id}`);
  }

}

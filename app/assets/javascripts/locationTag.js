class LocationTag{
  constructor(obj){
    this.id = obj.id
    this.title = obj.title;
    obj.address ? this.address = `, ${obj.address}` : this.address = "";
    this.pictures = obj.pictures;
    // this.searchObjectId = searchObjectId;
  }

  htmlStructure(){

    var objectInfo = `${this.title}${this.address}`;

    var htmlObject = `
      <h2 class="objectInfo">${objectInfo}:</h2>
      <div id="picturesSearched${this.id}"  class="containerSearch">
      </div>
    `;

    return htmlObject;

  }

  displayObject(){
    $('#searchCollection').prepend(this.htmlStructure());
    displayPictureCollection(this.pictures, `picturesSearched${this.id}`);
  }

}

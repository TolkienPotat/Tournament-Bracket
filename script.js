var lJSON = localStorage.getItem("tmbJSON");

document.getElementById("crBracket").onclick = function() {
  location.href = "createBracket.html";
};


function loadBracket() {
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {

    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
      var content = readerEvent.target.result.split("#BREAK#"); // this is the content!
      var x = JSON.parse(content[0]);
      localStorage.setItem("tmbJSON", content[0]);
      localStorage.setItem("tmbeJSON", content[1]);
      if (x[x.length - 1]){
        localStorage.setItem("tmbdJSON", content[2]);
      }
      location.href = "displayBracket.html";
      
      
    }

  }
  input.click();
}
  function checkLSL() {
    if (lJSON != null) {
      if (confirm("A previous bracket has been detected on your system. Press OK to continue this bracket."))
        location.href = "displayBracket.html";
    }
  }
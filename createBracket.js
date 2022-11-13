teamNames = [];
doubleEl = false;
numNames = 0;
var myJSON = localStorage.getItem("tmbJSON");


function readName(nele, isBt){
  if ((event.key == 'Enter' || isBt) && nele.value != ""){
    numNames++;
    const name = nele.value;
    nele.value = "";
    document.getElementById("nameList").innerHTML += "Team "+ numNames + ": " + name + "<br></br>";
    
    teamNames.push(name);
  }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.getElementById("create").onclick = function (){
  doubleEl = document.getElementById("dEm").checked;
  if (doubleEl && teamNames.length % 2){
    if(!confirm("Warning: Double Elimination may not display properly with an odd number of teams. To proceed, press OK.")){return}
  }
  if (teamNames.length < 2)
  {
    alert("Error: Not enough teams");
    return;
  }
  
  if (document.getElementById("randomize").checked)shuffleArray(teamNames);
  teamNames.push(doubleEl);
  myJSON = JSON.stringify(teamNames);
  localStorage.setItem("tmbJSON", myJSON);
  blank = [];
  blankJSON = JSON.stringify(blank);
  localStorage.setItem("tmbeJSON", blankJSON);
  localStorage.setItem("tmbdJSON", blankJSON);
  location.href = "displayBracket.html";
  

};
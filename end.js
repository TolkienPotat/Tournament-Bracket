

function checkWinner(){
  winner = localStorage.getItem("tmbWinner");
  if (winner != null){
    document.getElementById("winText").innerHTML = winner + " wins!";
  }
}

function endAndReturn(){
  
  
  blank = [];
  blankJSON = JSON.stringify(blank);
  localStorage.setItem("tmbeJSON", blankJSON);
  localStorage.setItem("tmbdJSON", blankJSON);
  localStorage.setItem("tmbJSON", blankJSON);
  location.href='index.html';
}



function checkWinner(){
  winner = localStorage.getItem("tmbWinner");
  if (winner != null){
    document.getElementById("winText").innerHTML = winner + " wins!";
  }
}
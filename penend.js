topWinner = localStorage.getItem("tmbMWin");
botWinner = localStorage.getItem("tmbBWin");
plDiv = document.getElementById("place");


function finalBracket(){

  document.getElementById("tGame").innerHTML = "Final Matchup!\nFirst Game: " + topWinner + " 1, " + botWinner + " 0.";
  

  firstGame = document.createElement("select");
  op1 = document.createElement("option");
  op1.text = topWinner;
  op2 = document.createElement("option");
  op2.text = botWinner;
  defOp = document.createElement("option");
  defOp.text = "---";
  firstGame.add(defOp);
  firstGame.add(op1);
  firstGame.add(op2);
  firstGame.addEventListener("change", (evt) => {if (evt.target.selectedIndex == 1){localStorage.setItem("tmbWinner",topWinner);location.href='end.html';}else{evt.target.remove();death();}});
  plDiv.appendChild(firstGame);
}

function death(){
  document.getElementById("tGame").innerHTML = "Final Game: " + topWinner + " 1, " + botWinner + " 1.";
  secGame = document.createElement("select");
  op1 = document.createElement("option");
  op1.text = topWinner;
  op2 = document.createElement("option");
  op2.text = botWinner;
  defOp = document.createElement("option");
  defOp.text = "---";
  secGame.add(defOp);
  secGame.add(op1);
  secGame.add(op2);
  secGame.addEventListener("change", (evt) => {if (evt.target.selectedIndex == 1){localStorage.setItem("tmbWinner",topWinner);location.href='end.html';}else{localStorage.setItem("tmbWinner",botWinner);location.href='end.html';}});
  plDiv.appendChild(secGame);
}

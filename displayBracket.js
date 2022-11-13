lJSON = localStorage.getItem("tmbJSON");
eJSON = localStorage.getItem("tmbeJSON");
dJSON = localStorage.getItem("tmbdJSON");
eJ = JSON.parse(eJSON);
dJ = JSON.parse(dJSON);
dArr = JSON.parse(lJSON);
dEm = dArr.pop();
em2 = localStorage.getItem("tmbem2JSON");
emArr = [];
replaceMeT = "----";

clickCount = 0;

function downloadObjectAsJson(exportName) {
  dArr.push(dEm);
  dataStr = "";
  if (dEm){
    dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dArr) + "#BREAK#" + JSON.stringify(eJ) + "#BREAK#" + JSON.stringify(dJ));
  }
  else{
    dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dArr) + "#BREAK#" + JSON.stringify(eJ));
   }
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}


function getNextReplacable(col) {
  var dDiv = document.getElementById("DoubleElBr");

  for (let i = col; i < dDiv.childElementCount; i++) {
    for (let j = 0; j < dDiv.childNodes[i].childElementCount; j++) {
      if (dDiv.childNodes[i].childNodes[j].childNodes[0].innerHTML == replaceMeT) {
        return i + 1 + "&&" + j;
      }
    }
  }
}

function updateBracket(prevCid, isDouble) {
  if (isDouble) {
    x = document.getElementById(prevCid);
    idB = x.id.split("&&");
    dJ[Number(idB[0]) * dArr.length + Number(idB[1])] = x.options[x.selectedIndex].text;
    id2val = idB[1];
    idB[0]++;
    idB[1] = Math.floor(idB[1] / 2);
    document.getElementById(idB[0] + "&&" + idB[1]).options[id2val % 2 + 1].text = x.options[x.selectedIndex].text;
    localStorage.setItem("tmbdJSON", JSON.stringify(dJ));
  }
  else {

    x = document.getElementById(prevCid);
    idA = prevCid.split("&");
    eJ[Number(idA[0]) * dArr.length + Number(idA[1])] = x.options[x.selectedIndex].text;
    idA[0]++;
    id1val = idA[1];
    idA[1] = Math.floor(idA[1] / 2);
    if (dEm) {
      nextRepID = getNextReplacable(0);
      idB = nextRepID.split("&&");
      dJ[Number(idB[0]) * dArr.length + Number(idB[1])] = x.options[x.selectedIndex].text;
      id2val = idB[1];
      idB[0]++;
      idB[1] = Math.floor(idB[1] / 2);
      document.getElementById(nextRepID).innerHTML = x.options[-x.selectedIndex + 3].text;
      document.getElementById(idB[0] + "&&" + idB[1]).options[id2val % 2 + 1].text = x.options[-x.selectedIndex + 3].text;
      localStorage.setItem("tmbdJSON", JSON.stringify(dJ));
    }

    document.getElementById(idA[0] + "&" + idA[1]).options[id1val % 2 + 1].text = x.options[x.selectedIndex].text;
    localStorage.setItem("tmbeJSON", JSON.stringify(eJ));
  }

}

function loadBracket() {

  numL1 = 2 * (dArr.length - Math.pow(2, Math.floor(Math.log(dArr.length) / Math.log(2))));
  if (numL1 == 0) numL1 = dArr.length;
  var iDiv = document.getElementById("outerB1");
  iDiv.className = "colorDiv";
  divX = document.createElement('div');
  divX.className = "colorDiv";
  divX.setAttribute("style", "display:inline-block");
  for (let i = 0; i < numL1; i++) {
    var div2 = document.createElement('div');
    div2.className = "colorDiv";
    var diP = document.createElement("p");
    diP.id = "0" + "&" + i;
    diP.innerHTML = dArr[i];
    div2.appendChild(diP);
    divX.appendChild(div2);
    iDiv.appendChild(divX);
  }
  if (dEm) {
    var dDiv = document.getElementById("DoubleElBr");
    dDiv.className = "colorDiv";
  }
  
  tNum = numL1 / 2;
  totalDLayN = numL1 / 2;
  tAddedUnused = totalDLayN - (2*Math.floor(totalDLayN/2));

  if (dEm) {
    divNE = document.createElement('div');
    divNE.className = "colorDiv";
    divNE.setAttribute("style", "display:inline-block");
    for (let jn = 0; jn < 2 * Math.floor(totalDLayN / 2); jn++) {

      if (dJ[Number(dArr.length + jn)] != null) {
        var diPE = document.createElement("p");
        diPE.innerHTML = dJ[dArr.length + jn];
        diPE.id = 1 + "&&" + jn;

      } else{
      var diPE = document.createElement('p');
      diPE.innerHTML = replaceMeT;
      // tAddedUnused--;

      diPE.id = 1 + "&&" + jn;
        
      }
      var div2E = document.createElement('div');
      div2E.className = "colorDiv";
      div2E.appendChild(diPE);
      divNE.appendChild(div2E);
    }
    totalDLayN -= Math.floor(totalDLayN / 2);
    dDiv.appendChild(divNE);
  }




  for (let i = 0; i < Math.ceil(Math.log(dArr.length) / Math.log(2)) + 1; i++) {

    numP = numL1;
    numL1 = dArr.length - tNum;
    totalDLayN += Math.floor(numL1 / 2);
    tAddedUnused += Math.floor(numL1 / 2);
    if (dEm) {
      divNE = document.createElement('div');
      divNE.className = "colorDiv";
      divNE.setAttribute("style", "display:inline-block");
      for (let jn = 0; jn < 2 * Math.floor(totalDLayN / 2) + (totalDLayN == 1); jn++) {

        if (dJ[Number((i + 2) * dArr.length + jn)] != null) {
          var diPE = document.createElement("p");
          diPE.innerHTML = dJ[(i + 2) * dArr.length + jn];
          diPE.id = i + 2 + "&&" + jn;
          if (jn >= totalDLayN - tAddedUnused) tAddedUnused--;
        }
        else if (jn < totalDLayN - tAddedUnused) {
          option = document.createElement("option");
          option2 = document.createElement("option");
          op1e = document.getElementById(i + 1 + "&&" + 2 * jn);
          op2e = document.getElementById(i + 1 + "&&" + (2 * jn + 1));

          defOption = document.createElement("option");
          defOption.text = "--";

          if (op1e.tagName.toLowerCase() == "select") {
            if (op1e.options[op1e.selectedIndex].text != "--") {
              option.text = op1e.options[op1e.selectedIndex].text;
            }
          } else {
            option.text = op1e.innerHTML;
          }

          if (op2e.tagName.toLowerCase() == "select") {
            if (op2e.options[op2e.selectedIndex].text != "--") {
              option2.text = op2e.options[op2e.selectedIndex].text;

            }
          } else {
            option2.text = op2e.innerHTML;
          }

          var diPE = document.createElement('select');
          diPE.add(defOption);
          diPE.add(option);
          diPE.add(option2);
          if (totalDLayN == 1){
            
            diPE.addEventListener("change", (evt) => {clickCount++;localStorage.setItem("tmbBWin", evt.target.options[evt.target.selectedIndex].text);if (clickCount >=2) location.href = "penend.html";});
            
          }else{
            diPE.addEventListener("change", (evt) => { updateBracket(evt.target.id, true); });
          }

        }
        else {

          var diPE = document.createElement('p');
          diPE.innerHTML = replaceMeT;
          tAddedUnused--;
        }
        diPE.id = i + 2 + "&&" + jn;
        var div2E = document.createElement('div');
        div2E.className = "colorDiv";
        div2E.appendChild(diPE);
        divNE.appendChild(div2E);
      }
      totalDLayN -= Math.floor(totalDLayN / 2);
      dDiv.appendChild(divNE);
    }
    if (Math.floor(numL1)){
      divN = document.createElement('div');
      divN.setAttribute("style", "display:inline-block");
      divN.className = "colorDiv";
    }
    for (let j = 0; j < Math.floor(numL1); j++) {
      var div2 = document.createElement('div');
      div2.className = "colorDiv";
      if (j < numP / 2) {
        if (eJ[Number((i + 1) * dArr.length + j)] != null) {
          var diP = document.createElement("p");
          diP.innerHTML = eJ[(i + 1) * dArr.length + j];
          diP.id = i + 1 + "&" + j;

        }
        else {
          var diP = document.createElement("select");
          var defOption = document.createElement("option");
          defOption.text = "--";
          var option = document.createElement("option");
          var option2 = document.createElement("option");
          op1e = document.getElementById(i + "&" + 2 * j);
          op2e = document.getElementById(i + "&" + (2 * j + 1));
          if (op1e.tagName.toLowerCase() == "select") {
            if (op1e.options[op1e.selectedIndex].text != "--") {
              option.text = op1e.options[op1e.selectedIndex].text;
            }
          } else {
            option.text = op1e.innerHTML;
          }

          if (op2e.tagName.toLowerCase() == "select") {
            if (op2e.options[op2e.selectedIndex].text != "--") {
              option2.text = op2e.options[op2e.selectedIndex].text;

            }
          } else {
            option2.text = op2e.innerHTML;
          }
          diP.add(defOption);
          diP.add(option);
          diP.add(option2);
          diP.id = i + 1 + "&" + j;
          if (numL1 == 1 && !dEm){
            diP.addEventListener("change", (evt) => {localStorage.setItem("tmbWinner", evt.target.options[evt.target.selectedIndex].text);location.href ="end.html";});
          } else if(numL1 == 1){
            diP.addEventListener("change", (evt) => { updateBracket(evt.target.id, false); });
            diP.addEventListener("change", (evt) => {clickCount++;localStorage.setItem("tmbMWin", evt.target.options[evt.target.selectedIndex].text);if (clickCount >=2) location.href = "penend.html";});
            
          }else{
            diP.addEventListener("change", (evt) => { updateBracket(evt.target.id, false); });
          }
        }
      }
      else {
        var diP = document.createElement("p");
        diP.innerHTML = dArr[tNum + j];
        diP.id = i + 1 + "&" + j;
      }
      div2.appendChild(diP);
      divN.appendChild(div2);
    }
    if (Math.floor(numL1))iDiv.appendChild(divN);
    tNum += numL1 / 2;
  }
}

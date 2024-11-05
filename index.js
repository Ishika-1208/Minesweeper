var board = [];
var rows = 8;
var columns = 8;
var minescount = 5;
var mineslocation = [];
var tileclicked = 0;
var flagenabled = false;
var gameover = false;
window.onload = function(){
    startgame();
}
function setmines(){
    mineslocation.push("2-2");
    mineslocation.push("2-3");
    mineslocation.push("5-6");
    mineslocation.push("3-4");
    mineslocation.push("1-1");
}
function startgame(){
    document.getElementById("mines-count").innerText = minescount;
    document.getElementById("flag-button").addEventListener("click",setflag);
    setmines();
    for ( let r=0;r<rows;r++){
        let row = [];
        for(let c=0;c<columns;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click",clicktile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
function setflag(){
    if(flagenabled){
        flagenabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else{
        flagenabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray"; 
    }
}
function clicktile(){
    let tile = this;
    if(flagenabled){
    if(tile.innerText == ""){
        tile.innerText = "🚩";
    }
    else if(tile.innerText == "🚩"){
        tile.innerText = "";
    }
    return;
    }
}
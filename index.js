var board = [];
var rows = 8;
var columns = 8;
var minescount = 45;
var mineslocation = [];
var tileclicked = 0;
var flagenabled = false;
var gameover = false;
window.onload = function(){
    startgame();
}
function setmines(){
    // mineslocation.push("2-2");
    // mineslocation.push("2-3");
    // mineslocation.push("5-6");
    // mineslocation.push("3-4");
    // mineslocation.push("1-1");

    let minesLeft =minesCount;
    while (minesLeft>0){

        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        let id = r.toString() + "-" +c.toString();
        if (mineslocation.includes(id)){
            mineslocation.push(id);
            minesLeft -=1;
    
        }
    

    }
   

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
    if (gameOver || this.classList.contains(tile-clicked)){
        return;
    }
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
    if (mineslocation.includes(title.id)){
        alert("GAME OVER");
        gameOver =true;
        revealMines();
        return;

    }
    let coords= tile.id.split("-");
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    checkMine(r,c);
    
    

}
function revealMines(){
    for (let r=0; r<row; r++){
       for(let c=0; c<columns; c++){
        let tile = board[r][c];
        if (mineslocation.includes(tile.id)){
            tile.innerText="💣";
            tile.style.backgroundColor="red"
        }
       }
    }
}
function checkMine(r,c){
    if(r<0 || r>=rows || c<0 ||c>=columns){
        return;
    }

    if ([r][c].classList.contains("tile.clicked")) {
        return;

    }
    board[r][c].classList.add("tile.clicked");
    tileclicked+=1;





    let minesFound =0;
    //top3
    minesFound+=checkTile(r-1, c-1);
    minesFound+=checkTile(r-1, c); 
    minesFound+=checkTile(r-1, c+1);

    //left and right
    minesFound+=checkTile(r-1, c-1);
    minesFound+=checkTile(r-1, c+1);

    //bottom
    minesFound+=checkTile(r+1, c-1);
    minesFound+=checkTile(r+1, c); 
    minesFound+=checkTile(r+1, c+1);

    if(minesFound>0){
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }

    if( tileclicked==rows*columns-minescount){
        document.getElementById("mines-count").innerText="cleared";
        gameOver = true;
    }




}
function checkTile(r,c){
    if(r<0 || r>=rows || c<0 ||c>=columns){
        return 0;
    }
    if ( mineslocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
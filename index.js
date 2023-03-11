const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;

//kitni grid fill ho gyi hai 
// next player ko chance dena hai ya nahi
// on which grid we are 
// this (gameGrid) will track
let gameGrid;

const winningPositions = [
    //horizontally
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // vertically
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonally
    [0,4,8],
    [2,4,6]
];


//intially we have to do following things 
// 1.current player = X;
// 2.all grid empty 
// 3.new button ko hide

function intiGame(){
    currentPlayer = "X";
    gameGrid=["","","","","","","","",""];

    // whenever you click on new game button we have to Empty on UI also 

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });


    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

intiGame();

function swapTurn(){
    if (currentPlayer === "X") {
        currentPlayer="O";        
    } else {
        currentPlayer="X";
    }
    //update current Player Info on UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
     if(gameGrid[index] === ""){
        //boxes[index] UI ke liye 
        boxes[index].innerText = currentPlayer;

        //gameGrid[index] hamare logic ke liye
        gameGrid[index]  = currentPlayer;

        //if we clicked on any box onces then ,make it unclickable 
        boxes[index].style.pointerEvents = "none";

        //x pr click hua toh o kr do
        swapTurn();

        //kahi gameWin ya gamOver toh nahi ho gya 
        checkGameOver();
     }
}

//apply EventListner on all 9 boxes 
boxes.forEach((box, index) => { 
   box.addEventListener("click",()=>{
    handleClick(index);
   }) 
});

newGameBtn.addEventListener("click",intiGame);


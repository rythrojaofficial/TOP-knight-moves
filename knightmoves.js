
// Assignment

// Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

// You can think of the board as having 2-dimensional coordinates. Calling your function would therefore look like:

// knightMoves([0,0],[1,2]) // returns [[0,0],[1,2]]

// define knight moves 
const knightMoves = [
    [2,1],
    [2,-1],
    [1,2],
    [1,-2],
    [-1,2],
    [-1,-2],
    [-2,1],
    [-2,-1]
]


// define 2d array.  array of 8 arrays
let board = [];
for(let i = 0; i < 8; i++){
    board[i] = Array(8).fill(null);
}
console.log({'initialize board': board})


// add a single move 
function addMove(x,y,step){
    // (x >= 0 && x <= 7 && y >= 0 && y <= 7 && board[x][y] == null)
    console.log(`attempting to add ${x},${y} on step ${step}`)
    if(
        x>=0 && x<=7 // x from 0-7
        && y>=0 && y<=7 // y from 0-7
        && board[x][y] == null // space is empty, knowing that 0 are possible entries
    ){
        board[x][y] = step // step zero would be the starting place, step 1 would be the first move, etc
        console.log({
            'step added':step
        })
    }else console.log('no move added')
    
}

// add all the knight moves
function addKnightMoves(x=0, y=0, step){
    knightMoves.forEach(move =>{
        addMove(x+move[0], y+move[1], step)
    })
}

// find all "occupied" squares and add all moves from the occupied squares
function addPossibleKnightMoves(step){
    for(let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if(board[i][j] === step){
                console.log('addingKnightMoves')
                addKnightMoves(i,j,step+1)
            }
        }
    }
}

//
function findPath(startCoordinates = [], endCoordinates = []){
    // coordinates
    const startX = startCoordinates[0],
        startY = startCoordinates[1],
        endX = endCoordinates[0],
        endY = endCoordinates[1];
    let stepIndex = 0;
    console.log({
        'startX': startX,
        'startY':startY,
        'endX': endX,
        'endY':endY
    })
    addMove(startX, startY, 0);
    do {
        addPossibleKnightMoves(stepIndex);
        stepIndex++;
    } while (board[endX][endY] == null); // step hasn't reached end coords
    return board[endX][endY] // returns the step!

}


const startCoordinates = [3,3],
    endCoordinates = [4,6];
let thePath =  `path from ${startCoordinates} to ${endCoordinates}`;

const test = {
    // 'knightMoves': knightMoves,
    // 'board': board
   'path': findPath(startCoordinates,endCoordinates),
   'board': board
}
console.log(test)
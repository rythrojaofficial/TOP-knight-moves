import { findPath } from "./knightmoves.js";

// define knight moves 
const knightMoves = [
    [-1,2], // up left
    [1,2], // up right
    [-2,1], // left up
    [2,1], // right up
    [-2,-1], // left down
    [2,-1], // right down
    [-1,-2], // down left
    [1,-2] // down right
];



// define 2d array.  array of 8 arrays
let board = [];
for(let i = 0; i < 8; i++){
    board[i] = Array(8).fill(null);
}
// console.log({'initialize board': board})


class Node{
    constructor(coords = [], step = null, parent = null,){
        this.coords = coords; 
        this.step = step;
        this.x = coords[0];
        this.y = coords[1];
        this.parent = parent;
        this.branches = [];

    }
    setParent(parent){
        this.parent = parent
    }
    setBranches(branches){
        this.branches = branches;
    }
    
}

class Path{
    constructor(startCoordinates, endCoordinates){
        this.startCoordinates = startCoordinates;
        this.endCoordinates = endCoordinates;
        this.head = null;
        this.stepArray = []
        this.tail = new Node(endCoordinates);
        this.main()
    }
    main(){
        this.head = new Node(this.startCoordinates, 0);
        this.rounds = findPath(this.head.coords, this.tail.coords)+1;
        this.recursiveAddMove(this.head);
        this.recursiveFindPath(this.tail);
        console.log({
            path: this.stepArray
        })

    }
    recursiveFindPath(node){
        this.stepArray.unshift([node.x, node.y]) // prepends the next node to the array
        if(node.parent === null){
            return
        }else {
            this.recursiveFindPath(node.parent)
        }
    }
    recursiveAddMove(node){
        if (this.tail.parent !== null){ return } // means coords are found
        if(node.x === this.tail.x
            && node.y === this.tail.y){
            console.log('end coords found')
            this.tail = node;
            return
        } // if you reached the end coords, exit
        else{
            knightMoves.forEach(move=>{
            let newX = node.x + move[0];
            let newY = node.y + move[1]
            this.addSingleMove(newX,newY,node)
            node.branches.forEach(branchNode =>{
                this.recursiveAddMove(branchNode)
            })


        })
            
    }}

    addSingleMove(x, y, parentNode){
        if(x>=0 && x<=7 // x from 0-7
            && y>=0 && y<=7
            && board[x][y] == null){                         
                // space is empty, knowing that 0 is a  possible entries
                let currentStep = parentNode.step+1
                if (currentStep > this.rounds){return}
                let newNode = new Node([x,y], currentStep, parentNode);
                parentNode.branches.push(newNode);
                board[x][y] = currentStep // step zero would be the starting place, step 1 would be the first move, etc
                console.log({currentStep: currentStep})
                return
                }  
}

}

const startCoordinates = [3,3],
    endCoordinates = [4,3],
    thePath = `path from ${startCoordinates} to ${endCoordinates}`,
    testBefore = {
        before: 'finding '+thePath,
    },
    myPath = new Path(startCoordinates, endCoordinates),
    testAfter = {
        myPath: myPath,
        board: board
        }


console.dir(testAfter, { depth: null });

// chess.js function
let board = function(c) {
  let ascii = c.ascii();

  let p = [
    
  ];

  for (let i = 0; i < ascii.length; i++) {
    let valid_pieces = ["p", "P", "r", "R", "b", "B", "k", "K", "n", "N", "q", "Q", "."]
    if (valid_pieces.includes(ascii[i])) {
      let v = p.length;
      p.push({
        piece: ascii[i],
        row: Math.floor(v/8),
        column: (v) % 8
      });
    }
  }
  p.pop();
  return p;
}

//variable setup
let tiles = [];
let pieces = [];
let size = 500/8;

var chess = new Chess();

var updateboard = function() { //                   FETCH CURRENT BOARD FROM API
  
  pieces = [];
  
  let brd = board(chess);
  
  for (let i = 0; i < brd.length; i++) {
    if (brd[i].piece != ".") {
      let x = brd[i].column * size;
      let y = brd[i].row * size;
      pieces.push(new piece(x, y, brd[i].piece, brd[i])); //m                      WIP
    }
  }
  
}

var conversion = function(val) { // convert number to letter
  let rows = ["a", "b", "c", "d", "e", "f", "g", "h"]
  
  return rows[val];
}


function setup() {
  createCanvas(500, 500)
  
  // CREATE PIECES
 let brd = board(chess);
  
  for (let i = 0; i < brd.length; i++) {
    if (brd[i].piece != ".") {
      let x = brd[i].column * size;
      let y = brd[i].row * size;
      pieces.push(new piece(x, y, brd[i].piece, brd[i])); //m                      WIP
    }
  }
  // CREATE TILES
  let i = 0;
  for (let x = 0; x < 8; x++) {
    i++;
    for (let y = 0; y < 8; y++) {
      i++;
      
      if (i % 2 == 0) {
        tiles.push(new tile(x*size, y*size, color(245)));
      } else {
        tiles.push(new tile(x*size, y*size, color(0, 175, 0)));
      }
      
    }
  }
}


/*
// RANDOM MOVES
setInterval(
  () => {
    var moves = chess.moves();
    var move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
  },
  1000
);
*/

let piecemoved; // when you click a piece

function draw() {
  for (let i = 0; i < tiles.length; i++) { // draw tiles
    tiles[i].display();
  }
  
  for (let i = 0; i < pieces.length; i++) { // draw pieces
    pieces[i].display();
  }
  
}

let sss; // initial piece clicked

function mousePressed() {
  for (let i = 0; i < pieces.length; i++) {
    if (mouseX > pieces[i].x && mouseX < pieces[i].x + size && mouseY > pieces[i].y && mouseY < pieces[i].y + size) { // select piece
      pieces[i].x = mouseX-size/2;
      pieces[i].y = mouseY-size/2;
      piecemoved = i;
      sss = i;
    }
  }
}
function mouseDragged() { // draw selected piece
  pieces[sss].x = mouseX-size/2;
  pieces[sss].y = mouseY-size/2;
}

function mouseReleased() { // update chess.js board
  // selected piece
  let p = pieces[piecemoved];
  
  // initial location
  let prevr = Math.floor((p.intx+size/2)/size);
  let prevc = 8 - Math.floor((p.inty+size/2)/size);
  
  // new location
  let newrow = Math.floor((p.x+size/2)/size);
  let newcolumn = 8 - Math.floor((p.y+size/2)/size);
  
  // notation
  let move = conversion(newrow) + "" + newcolumn;
  let fro = conversion(prevr) + "" + prevc;
  
  // remove pieces, then define new piece
  chess.remove(fro);
  chess.remove(move);
  chess.put(p.data, move)
  
  updateboard(); // update p5.js board
   
  /*
  //                                          WIP                               
  if  (p.type == "p" || p.type == "P") {
    if (newcolumn == 8 || newcolumn == 1) {
      var v = prompt("Promote to? queen = q, knight = n, bishop = b, rook = r", "q");

      if (v == null || v == "") {
        v = "q"
      } else {
        v = v
      }
    }
  }
  */
}

class tile { // tile class
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
  }
  
  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, size, size);
  }
}

class piece { // pieces class
   constructor(x, y, c, d) {
     this.x = x;
     this.y = y;
     this.type = c;
     this.intx = x;
     this.inty = y;
     
     if (d.piece == d.piece.toLowerCase())
    {
      this.data = {
        type: d.piece,
        color: 'b'
      }
    }
    else
    {
      this.data = {
        type: d.piece.toLowerCase(),
        color: 'w'
      }
    }
     
     
     this.character = c;
     this.codes = {
        R: "\u2656",
        P: "\u2659",
        N: "\u2658",
        K: "\u2654",
        Q: "\u2655",
        B: "\u2657",
        r: "\u265c",
        p: "\u265f",
        n: "\u265e",
        k: "\u265a",
        q: "\u265b",
        b: "\u265d"
      }
   }
  
   display() {
    let x = this.x;
    let y = this.y;
     
    noStroke();
    fill(0);
    textSize(50);
    text(this.codes[this.character], x+5, y+size-10);
     
    /*
    if (mouseIsPressed) {
      if (mouseX > this.x && mouseX < this.x + size && mouseY > this.y && mouseY < this.y + size) {
        this.x = mouseX-size/2;
        this.y = mouseY-size/2;
      }
    } else {
      this.x = x;
      this.y = y;
    */
    
  }
}

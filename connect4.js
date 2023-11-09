"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)

/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  debugger;
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++){
    let boardRow = []

    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex ++){
      boardRow.push(null);
    }

    board.push(boardRow);
  }
  console.log('makeBoard function complete')
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  console.log('started makeHtmlBoard function')
  const htmlBoard = document.getElementById("board");

  // Create the top row and set the id to column-top
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  //Create cells, append click handler and populate top row, add row to board
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // These loops create the table rows elements and cells
  // and assigns coordinate ids to them, then appends to HTML
  for (let y = 0; y < HEIGHT; y++) {

    const row = document.createElement("tr");
    row.setAttribute("id", `row-${y}`);

    for (let x = 0; x < WIDTH; x++) {

      const cell = document.createElement("td");
      cell.setAttribute("id", `c-${y}-${x}`);

      row.append(cell);
    }

    htmlBoard.append(row);
  }
  console.log('exiting htmlBoard')
}

/** findSpotForCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled) */

function findSpotForCol(x) {
  for (let yCoord = (HEIGHT-1); yCoord >= 0; yCoord--){
    if (board[yCoord][x] === null){
      return yCoord;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  var piece = document.createElement("div");
  piece.classList.add("piece")
  piece.classList.add(`p${currPlayer}`)

  let tableCell = document.getElementById(`c-${y}-${x}`)

  tableCell.append(piece)



  // TODO: make a div and insert into correct table cell
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update global `board` variable with new piece
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  // TODO: check if all cells in board are filled; if so, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}

start();
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/ 

*/ 

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
//with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({'n': n});
  var positionRooks = function(board, rowStart) {
    if (rowStart === n) {
      return board.rows();
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowStart, i);
      if (!board.hasAnyRooksConflicts()) {
        var newBoard = board;
        return positionRooks(newBoard, rowStart + 1);
      }
      board.togglePiece(rowStart, i);
    }
  };
  solution = positionRooks(board, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, 
//with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;
  if (n >= 1) {
    solutionCount = 1;
    for (var i = n; i > 1; i--) {
      solutionCount *= i;
    }
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};







// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var solution;

  var positionQueens = function(board, rowStart) {
    if (rowStart === n) {
      return board.rows();
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowStart, i);
      if (!board.hasAnyQueensConflicts()) {
        var position = positionQueens(board, rowStart + 1);
        if (position) {
          return position;
        }
      }
      board.togglePiece(rowStart, i);
    }
  };
  if (n === 2 || n === 3) {
    return board.rows();

  solution = positionQueens(board, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({'n': n});
  var positionQueens = function(board, rowStart, size) {
    if (rowStart === size) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < size; i++) {
      board.togglePiece(rowStart, i);
      if (!board.hasAnyQueensConflicts()) {
        var position = positionQueens(board, rowStart + 1, n);
        if (position) {
          return position;
        }
      }
      board.togglePiece(rowStart, i);
    }
  };

  positionQueens(board, 0, n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};











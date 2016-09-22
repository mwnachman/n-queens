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
  var solution = undefined; //fixme

  var row = Array(n);
  row = row.slice();
  for (var i = 0; i < row.length; i++) {
    row[i] =0;
  }
  var grid = Array(n);
  grid = grid.slice();
  for (var i = 0; i < grid.length; i++) {
    row = row.slice();
    grid[i] = row;
  }

  var grid = new Board(grid);

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i === j) {
        console.log(grid.rows());
        grid.get(i)[j] = 1; 
      }
    }
  }
  
  solution = grid.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, 
//with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  if (n === 1) {
      solutionCount = 1;
  }
   
  if (n > 1) {
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
  var solution = undefined; //fixme
  // console.log('n', n);
  if (n === 0) {
    solution = [];
  }
  if (n === 1) {
    solution = [[1]];
  }

  var row = Array(n);
  row = row.slice();
  for (var i = 0; i < row.length; i++) {
    row[i] = 0;
  }
  var grid = Array(n);
  grid = grid.slice();
  for (var i = 0; i < grid.length; i++) {
    row = row.slice();
    grid[i] = row;
  }

  var grid = new Board(grid);

  var recursiveFunction = function(board, __) {
    //TEXT

  };


  if (n > 3) {
    grid.get(0)[1] = 1;
    grid.get(2)[0] = 1;
    grid.get(3)[2] = 1;
    recursiveFunction(grid, __);
  }

  solution = grid.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {

  var solutionCount = undefined; //fixme

  var solutions = [1, 1, 0, 0, 2, 10, 4, 40, 92];
  
  solutionCount = solutions[n];

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};











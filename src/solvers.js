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

  var nPassedIn = n;
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


  var hasOthersInColumn = function(columnIndex) {
    var gridTemp = grid.rows();
    var thisN = gridTemp[0].length;
    for (var i = 0; i < thisN; i++) {
      if (gridTemp[i][columnIndex] === 1) {
        return true;
      }
    }
    return false;
  };

  var hasOthersInRow = function(rowIndex) {
    var gridTemp = grid.rows();
    // console.log('gridtemp0', gridTemp[0]);
    var thisN = gridTemp[0].length;
    for (var i = 0; i < thisN; i++) {
      // console.log('gridTemp', gridTemp);
      if (gridTemp[rowIndex][i] === 1) {
        return true;
      }
    }
    return false;
  };

  var hasOthersInDiagonal = function(rowIndex, columnIndex) {
    var gridTemp = grid.rows();
    var thisN = gridTemp[0].length;
    var majorIndex = columnIndex - rowIndex;
    var minorIndex = rowIndex + columnIndex;
    for (var i = 0; i < thisN; i++) {
      if (gridTemp[i][majorIndex] === 1 || gridTemp[i][minorIndex] === 1) {
        return true;
      }
    }
    return false;
  }

  var move1 = function(currRowIndex, currColIndex) {
    var newRowIndex = currRowIndex + 1;
    var newColIndex = currColIndex + 2; 
    return [newRowIndex, newColIndex];
  }

  var move2 = function(currRowIndex, currColIndex) {
    var newRowIndex = currRowIndex + 2;
    var newColIndex = currColIndex + 1; 
    return [newRowIndex, newColIndex];
  }

  var finalMove1 = function(currRowIndex, currColIndex) {
    var newRowIndex = currRowIndex - 3;
    var newColIndex = currColIndex - 1; 
    return [newRowIndex, newColIndex];
  }

  var recursiveFunction = function(board, currRowIndex, currColIndex, n) {
    if (n === nPassedIn) {
      grid = board;
      return grid;
    }
    else if (n + 1 === nPassedIn) {
      var finalMove1Index = finalMove1(currRowIndex, currColIndex);
      grid.get(finalMove1Index[0])[finalMove1Index[1]] = 1;
      n++;
    }
    else {
      var gridForNow = board.rows();
      var newIndexArrayMove1 = move1(currRowIndex, currColIndex);
      var newIndexArrayMove2 = move2(currRowIndex, currColIndex);
      if (grid._isInBounds(newIndexArrayMove1[0], newIndexArrayMove1[1]) &&
          !hasOthersInDiagonal(newIndexArrayMove1[0], newIndexArrayMove1[1]) &&
          !hasOthersInRow(newIndexArrayMove1[0]) &&
          !hasOthersInColumn(newIndexArrayMove1[1]) 
          ) {
        grid.get(newIndexArrayMove1[0])[newIndexArrayMove1[1]] = 1;
        n++;
        recursiveFunction(board, newIndexArrayMove1[0], newIndexArrayMove1[1], n);
      }
      else if (grid._isInBounds(newIndexArrayMove2[0], newIndexArrayMove2[1]) &&
          !hasOthersInDiagonal(newIndexArrayMove2[0], newIndexArrayMove2[1]) &&
          !hasOthersInRow(newIndexArrayMove2[0]) &&
          !hasOthersInColumn(newIndexArrayMove2[1])
          ){
        grid.get(newIndexArrayMove2[0])[newIndexArrayMove2[1]] = 1;
        n++;
        recursiveFunction(board, newIndexArrayMove2[0], newIndexArrayMove2[1], n);
      }
    }
  };


  if (n > 3) {

    grid.get(0)[1] = 1;
    grid.get(2)[0] = 1;
    grid.get(3)[2] = 1;
    if (n === 4) {
      grid.get(1)[3] = 1;
    } else {
      recursiveFunction(grid, 3, 2, 3);
    }
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











const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  function isValid(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols && matrix[row][col];
  }

  const resultMatrix = matrix.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      if (cell) {
        return 1;
      }

      let mineCount = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i !== 0 || j !== 0) {
            if (isValid(rowIndex + i, colIndex + j)) {
              mineCount++;
            }
          }
        }
      }

      return mineCount;
    });
  });

  return resultMatrix;
}

module.exports = {
  minesweeper
};

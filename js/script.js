(() => {
  "use strict";

  let totalItems = 20; // must be even

  // game board
  let bord = document.getElementById('board');
  let result = document.getElementById('result');
  const makeBoard = () => {
    for (let i = 0; i < totalSquares; i++) {
      bord.innerHTML += '<span id="item_' + (i + 1) + '" class="item"><b></b></span>';
    }
    result.innerHTML = '<p>Failures: <span id="fails">0</span><br>Time: <span id="timer">00:00:00</span></p>';
  }

  // random pairs
  let pairs = [];
  const createPairs = () => {
    let number = 1;
    let evenFlag = 0;
    do {

      // from 1 to totalSquares
      let index = Math.floor(Math.random() * totalSquares) + 1;

      if (typeof pairs['item_' + index] === 'undefined') {

        pairs['item_' + index] = number;

        if ((++evenFlag) % 2 === 0) {
          number++;
        }

      }

    } while (number <= totalSquares / 2);
  }




  makeBoard();

})();
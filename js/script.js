(() => {
  "use strict";

  // must be even
  // let button = document.querySelector('.button');
  // let inputIn = document.querySelector('.input-in');

  // let totalISquares = +number;
  // let totalISquares = +inputIn.value;

  // function number() {
  //   if (inputIn % 2 === 0) {
  //     let totalISquares = +inputIn.value;
  //     makeBoard();
  //   } else {
  //     console.log('Число не чётное!');
  //   }
  // }
  let totalISquares = 20;

  // button.addEventListener("click", number);

  // game board
  let bord = document.getElementById('board');
  let result = document.getElementById('result');
  const makeBoard = () => {
    for (let i = 0; i < totalISquares; i++) {
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

      // from 1 to totalISquares
      let index = Math.floor(Math.random() * totalISquares) + 1;

      if (typeof pairs['item_' + index] === 'undefined') {

        pairs['item_' + index] = number;

        if ((++evenFlag) % 2 === 0) {
          number++;
        }

      }

    } while (number <= totalISquares / 2);
  }

  // zero padding
  let setPad = (val) => (val < 10 ? '0' : '') + val;

  // timer
  let timerInt = null;
  const startTimer = () => {
    let totalSeconds = 0;
    timerInt = setInterval(() => {
      totalSeconds++;
      document.getElementById('timer').innerText = setPad(parseInt(totalSeconds / 3600)) + ':' + setPad(parseInt(totalSeconds / 60) % 60) + ':' + setPad(totalSeconds % 60);
    }, 1000);
  }
  const stopTimer = () => clearInterval(timerInt);

  // game actions
  const startGame = () => {
    let fails = 0;
    let done = 0;
    let openedItem = null;
    let disableClick = false;
    let items = document.getElementsByClassName('item');
    for (let index = 0; index < items.length; index++) {

      // item clicked
      items[index].onclick = (e) => {

        if (timerInt === null) {
          startTimer();
        }

        if (!disableClick) {

          let item = e.target;

          if (!item.classList.contains('done')) {

            let pair = pairs[item.getAttribute('id')];
            let itemText = item.getElementsByTagName('b')[0];

            itemText.innerText = setPad(pair);
            itemText.classList.add('active');

            // css classes
            if (item.classList.contains('opened')) {
              item.classList.remove('opened');
            } else {
              item.classList.add('opened');
            }

            // pair comparison
            if (openedItem === null) {

              // just one item opened
              openedItem = item;

            } else if (openedItem !== item && pairs[openedItem.getAttribute('id')] === pair) {

              // pair matched
              disableClick = true;
              setTimeout(() => {
                item.classList.add('done');
                item.classList.remove('opened');
                openedItem.classList.add('done');
                openedItem.classList.remove('opened');
                openedItem = null;
                disableClick = false;
                if (++done * 2 == totalISquares) {
                  // game finished
                  stopTimer();
                  setTimeout(() => {
                    result.innerHTML
                      += '<p>Congratulations!<br><a href="./">play again</p>';
                  }, 1000);
                }
              }, 500);

            } else {

              // no match
              disableClick = true;
              setTimeout(() => {

                let openedItemText = openedItem.getElementsByTagName('b')[0];

                item.classList.remove('opened');
                openedItem.classList.remove('opened');

                itemText.classList.remove('active');
                openedItemText.classList.remove('active');

                setTimeout(() => {
                  itemText.innerText = '';
                  openedItemText.innerText = '';
                  openedItem = null;
                  disableClick = false;
                }, 500);

                if (openedItem !== item) {
                  document.getElementById('fails').innerText = ++fails;
                }

              }, 500);

            }

          }

        }

      }

    }

  }


  makeBoard();
  createPairs();
  startGame();

})();
let playBoard = ["", "", "", "", "", "", "", "", ""];
const playArea = document.getElementById('board');
let turn = 0;

playArea.addEventListener('touchend', (event) => {
    let char = turn % 2 == 0 ? "X" : "O";
    //console.log(event.target.id);
    if (document.getElementById(event.target.id).innerHTML !== "") {
        document.getElementById(event.target.id).classList.add('occupied');
        setTimeout(function() {
            document.getElementById(event.target.id).classList.remove('occupied');
          }, 1000);
        return;}
    else {
    document.getElementById(event.target.id).innerHTML = char;
    let index = event.target.getAttribute('dataIndex');
    playBoard[index] = char;
    //console.log(playBoard);
    }
    gameWon();
    turn++;
});

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`block${i}`).innerHTML = '';
    }
    for (let i = 0; i < 9; i++) {
        playBoard[i] = '';
    }
    turn = 0;
    document.getElementById('winner').innerHTML = '';
}

function gameWon() {
    let pos1 = playBoard[0];
    let pos2 = playBoard[1];
    let pos3 = playBoard[2];
    let pos4 = playBoard[3];
    let pos5 = playBoard[4];
    let pos6 = playBoard[5];
    let pos7 = playBoard[6];
    let pos8 = playBoard[7];
    let pos9 = playBoard[8];

    if  (((pos1 == pos2) && (pos2 == pos3)) && (pos1 && pos2 && pos3)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos1}, You Won!`;}
        else if (((pos4 == pos5) && (pos5 == pos6)) && (pos4 && pos5 && pos6)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos4}, You Won!`}
        else if (((pos7 == pos8) && (pos8 == pos9)) && (pos7 && pos8 && pos9)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos7}, You Won!`}
        else if (((pos1 == pos4) && (pos4 == pos7)) && (pos1 && pos4 && pos7)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos1}, You Won!`}
        else if (((pos2 == pos5) && (pos5 == pos8)) && (pos2 && pos5 && pos8)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos2}, You Won!`}
        else if (((pos3 == pos6) && (pos6 == pos9)) && (pos3 && pos6 && pos9)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos3}, You Won!`}
        else if (((pos1 == pos5) && (pos5 == pos9)) && (pos1 && pos5 && pos9)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos1}, You Won!`}
        else if (((pos3 == pos5 && pos5 == pos7)) && (pos3 && pos5 && pos7)) {
            document.getElementById('winner').innerHTML = `Congratulations ${pos3}, You Won!`}
        else if (turn > 7) {
            document.getElementById('winner').innerHTML = `Sorry, no winners this time!`}
    }

// mouseParagraph.addEventListener('mousemove', () =>  console.log('You Moved!') );
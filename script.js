//initial data
let square = {
    a1: '',a2: '', a3: '',
    b1: '',b2: '', b3: '',
    c1: '',c2: '', c3: ''
 };
let playerTurn = '';
let warning = '';
let playing = false;
let audio = document.querySelector('audio')

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})
document.querySelector('button').addEventListener('click',clicks)

reset()

//Functions
function clicks(){
    let displays = document.querySelector('.initial')
    let audioElement = document.querySelector('audio')
    
    displays.style.display = 'none'

    audioElement.play()
}
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = playerTurn;
        renderSquare();
        togglePlayer();
    }
}
function reset(){
    warning = '';

    let random = Math.floor(Math.random()*2);

    playerTurn = (random === 0) ? 'X' : 'O';

    for(let i in square){
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}
function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame()
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer(){
    playerTurn = (playerTurn === 'X') ? 'O' : 'X';
    renderInfo();
}
function checkGame(){
    if(checkWinnerFor('X')){
        warning = "X Venceu";
        playing = false;
    }else if(checkWinnerFor('O')){
        warning = "O Venceu";
        playing = false;
    }else if(isFull()){
        warning = "Deu velha";
        playing = false;
    }
}

function checkWinnerFor(playerTurn){
    let possible = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ]

for(let p in possible){
    let pArray = possible[p].split(',') //a1,a2,a3
    let wasWon = pArray.every(option => square[option] === playerTurn);
    if(wasWon){
        return true;
    }
}
    return false;
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }

    return true;
}
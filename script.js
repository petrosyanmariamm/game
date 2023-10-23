//SELECTORS
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $changeTime = document.querySelector('#changeTime');

const colors = ['orange', 'yellow', 'red', 'green', 'blue', 'pink', 'coral', 'purple', 'brown'];
let score = 0;


// EVENT LISTENERS
$start.addEventListener('click', startGameFunc);
$changeTime.addEventListener('change', changeTimeFunc);
$game.addEventListener('click', clickHandlerFunc);


// FUNCTIONS

function startGameFunc(e){

    score = 0;
    $result.textContent = score;

    hide($start);
    $game.style.backgroundColor = 'white';
    $changeTime.setAttribute('disabled', 'true');


    const interval = setInterval(function(){
        let time = +$time.textContent;

        if(time === 0) {
            clearInterval(interval);
            endGameFunc();
        }
        else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100); // 100mv === 0.1v


    renderBox();

}


function endGameFunc(){
    show($start);
    $game.style.backgroundColor = 'rgb(103, 103, 214)';
    $time.textContent = (+$changeTime.value).toFixed(1);
    $game.textContent = '';
    $changeTime.removeAttribute('disabled');
}


function changeTimeFunc(e){
    $time.textContent = (+$changeTime.value).toFixed(1);
}


function renderBox(){

    $game.textContent = '';

    const size = random(30, 100);
    const colorIndex = random(0, colors.length-1);
    
    const gameSize = $game.getBoundingClientRect(); // {x: , y: , width: 300, height: 300}
    const left = random(0, gameSize.width - size);
    const top = random(0, gameSize.height - size);


    const box= document.createElement('div');
    box.style.width = box.style.height = size+'px';
    box.style.backgroundColor = colors[colorIndex];
    box.style.cursor = 'pointer';
    box.style.position = 'absolute';
    box.style.left = left+'px';
    box.style.top = top+'px';
    box.setAttribute('data-box', 'true');
    
    $game.append(box);


}


function clickHandlerFunc(e){
    if(e.target.dataset.box){
        score++;
        $result.textContent = score;
        renderBox();
    }
    
}


function hide($el){
    $el.classList.add('hide');
}


function show($el){
    $el.classList.remove('hide');
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}




// criando o state do jogo com os elementos do html
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#timeLeft"),
        score: document.querySelector("#score"),
    },

    values: {
        colidePoint: 0,
        result: 0,
        currentTime: 60,
    },

    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }

};

// função para contagem regressiva do tempo de jogo 
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0) {
        playSound("game-over");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        
    }
}

// função para tocar o som do jogo
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();

}
// função para escolher um quadrado aleatorio para o inimigo 
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); // remove enemy from all squares
    });

    let randomNumber = Math.floor(Math.random() * 9); // choose random number   
    let randomSquare = state.view.squares[randomNumber]; // include random number on a random square
    randomSquare.classList.add("enemy");
    state.values.colidePoint = randomSquare.id;
}


// função para escutar os clicks nos quadrados 
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.colidePoint) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.colidePoint = null;
                playSound("hit");
            }
        });
    });
}

// função para iniciar o jogo
function init() {
    addListenerHitBox()
}
 // chamada da funcao que inicia o jogo 
init()
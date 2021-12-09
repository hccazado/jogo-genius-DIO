let order = []; //recebe a ordem de luzes 
let clickOrder = []; //ordem dos clicks
let score = 0; //pontuação
let player = '';

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const counter = document.querySelector('.score');

//cria ordem aleatoria de cores
let shuffleOrder = () =>{
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickOrder = [];

    for(i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) =>{
    number = number * 600;
    setTimeout(()=>{
        element.classList.add('selected');
    }, number - 300);
    setTimeout(()=>{
        element.classList.remove('selected');
    }, number);
}



//verificando botoes clicados são os mesmos do jogo
let checkOrder = () =>{
    for(let i in clickOrder){
        if(clickOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickOrder.length == order.length){
        nextLevel();
    }
}

//capturando click do usuario
let click = (color) =>{
    clickOrder[clickOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() =>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);

    
}

//retorna a cor
let createColorElement = (color) =>{
    if(color == 0){
        return green;
    }
    else if(color == 1){
        return red;
    }
    else if(color == 2){
        return yellow;
    }
    else if(color == 3){
        return blue;
    }
}

//proximo nivel
let nextLevel = () =>{
    score++;
    counter.innerText = `${player}: ${score} Pts`;
    shuffleOrder();
}

//game over
let gameOver = () =>{
    alert(`Pontuação: ${score}\nVocê errou!\nClique em Ok para nova partida`);
    order=[];
    clickOrder=[];

    playGame();
}

let playGame = () =>{
    
    //boas vindas e recepção do nome do jogador
    player = prompt("Bem vindo ao Gênesis!\n\nInforme seu nome:");
    //verifica se usuario cancelou o prompt (player = null) ou se deixou campo vazio ""
    player = player == "" || player==null ? "Jogador" : player;
    score = 0;
    
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();

const dino = document.querySelector('.dino');
const backgroud = document.querySelector('.background');

let position = 0;

let isJumping = false; // pulo do dino


// função para um evento de preessionar a tecla backspace
function handlerKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}


// função para pulo

function jump(){

    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            
            //desce
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);

        }else{
            // sobe
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}



function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    backgroud.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 5;
        cactus.style.left = cactusPosition + 'px';

        if(cactusPosition < -60){
            clearInterval(leftInterval);
            backgroud.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60 ){
            // game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';

        }else{
            cactusPosition -= 5 ;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}



// cria o cacto dentro da div principal
createCactus();
// escuta um evento e pega a chave da tecla pressionada e passa para a função
document.addEventListener('keyup', handlerKeyUp);
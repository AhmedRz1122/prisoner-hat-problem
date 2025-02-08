let timer = document.querySelector(".timer");
let menu = document.querySelector(".menu");
const hats = document.querySelectorAll('.hat');
const container = document.querySelector('.pos-container');
timer.style.fontSize = "20px";
let countdown = 10;

let userGuessed = false;

let interval = setInterval(() => {
    if (countdown > 0) {
        timer.innerHTML = `Time Left: ${countdown}s`;
        countdown--;
    } else {
        clearInterval(interval);
        timer.innerHTML = "Time's up!";
        if (!userGuessed) {
            alert("Game over! You failed to answer in time.");
            endGame();
        }
    }


}, 1000);//1 sec



function assignRandomColors() {
    hats.forEach(hat => {
        const randomColor = Math.random() > 0.5 ? 'black' : 'white';
        hat.style.backgroundColor = randomColor;
    });
}


function hideOneHatAndGuess() {

    assignRandomColors();


    const randomIndex = Math.floor(Math.random() * hats.length);
    const hiddenHat = hats[randomIndex];


    const hiddenColor = hiddenHat.style.backgroundColor;


    hiddenHat.style.backgroundColor = 'transparent';


    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    // buttonContainer.style.marginTop = '20px';
    buttonContainer.style.textAlign = 'center';

    const blackButton = document.createElement('button');
    blackButton.textContent = 'Black';
    styleButton(blackButton);

    const whiteButton = document.createElement('button');
    whiteButton.textContent = 'White';
    styleButton(whiteButton);

    buttonContainer.appendChild(blackButton);
    buttonContainer.appendChild(whiteButton);
    menu.appendChild(buttonContainer);



    blackButton.addEventListener('click', () => checkGuess('black', hiddenColor, hiddenHat, buttonContainer));
    whiteButton.addEventListener('click', () => checkGuess('white', hiddenColor, hiddenHat, buttonContainer));
}




function styleButton(button) {
    // button.style.marginTop = '20px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = 'rgb(51, 51, 51)';
    button.style.color = 'rgb(255, 255, 255)';
    button.style.cursor = 'pointer';
    button.style.padding = '10px 20px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.marginRight = '12px';
}

function checkGuess(guess, hiddenColor, hiddenHat, buttonContainer) {
    userGuessed = true;
    clearInterval(interval);
    if (guess === hiddenColor) {
        alert('Correct! The hidden color was ' + hiddenColor + '.');
    } else {
        alert('Wrong! The hidden color was ' + hiddenColor + '.');
    }


    hiddenHat.style.backgroundColor = hiddenColor;

    buttonContainer.remove();
}

function endGame() {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        button.style.opacity = '0.5';
    });
}

hideOneHatAndGuess();

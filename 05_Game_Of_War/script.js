// "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
// `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`

const DECK_OF_CARDS_API = "https://apis.scrimba.com/deckofcards/api/deck";

let deckId = null;
let computerScore = 0;
let userScore = 0;


// elements
// containers
const gameBanner = document.getElementById("game-banner");
const gameContainer = document.querySelector(".game-container");
//btns
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const drawBtn = document.getElementById("draw-btn");
// text updates
const remainingCards = document.getElementById("card-number");
const resultTxtElement = document.getElementById("result-txt");
const computerScoreElement = document.getElementById("computer-score");
const userScoreElement = document.getElementById("user-score");
// img updates
const computerCard = document.getElementById("computer-card");
const userCard = document.getElementById("user-card");

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", reStartGame)
drawBtn.addEventListener("click", playRound);

async function startGame() {
    // disable the start button
    startBtn.textContent = "ENTERING..."
    startBtn.disabled = true;
    
    // call restart game
    await reStartGame();

    // hide the banner    
    gameBanner.classList.add("remove");
    // show the game
    gameContainer.classList.remove("hidden");

    // reset the start button
    startBtn.textContent = "ENTER"
    startBtn.disabled = false;
}

async function reStartGame(){
    restartBtn.textContent = "GETTING NEW DECK..."
    restartBtn.disabled = true;

    // get new deck
    const deck = await getNewDeck();
    // assign the deck id
    deckId = deck.deck_id;

    // reset remaining cards
    remainingCards.textContent = deck.remaining;

    // reset scores
    computerScoreElement.textContent = computerScore = 0;
    userScoreElement.textContent = userScore = 0;

    // reset the result
    resultTxtElement.textContent = "War Begins!..."


    // reset the button
    restartBtn.textContent = "RESTART"
    restartBtn.disabled = false;
}

async function getNewDeck(){
    try{
        const response = await fetch(`${DECK_OF_CARDS_API}/new/shuffle/`);
    
        if(!response.ok){
            throw Error(`Error getting card deck : ${response.status}`);
        }

        return await response.json();
    }
    catch(error){
        console.log(`Error : ${error.message}`);
        return null;
    }
}

async function playRound() {
    drawBtn.textContent = "DRAWING..."
    drawBtn.disabled = true;
    
    resultTxtElement.textContent = "FIGHTING..."

    const drawings = await drawCards();
    if (!drawings){ return; }

    const {image: compCardImg, value: compCardVal} = drawings.cards[0];
    const {image: userCardImg, value: userCardVal} = drawings.cards[1];

    computerCard.innerHTML = `<img src="${compCardImg}"/>`;
    userCard.innerHTML = `<img src="${userCardImg}"/>`;
    
    let resultText = "";
    if(compCardVal > userCardVal){
        resultText = "OPPONENT WON THAT ROUND!";
        computerScoreElement.textContent = ++computerScore;
    }
    else if(userCardVal > compCardVal){
        resultText = "YOU WON THAT ROUND!";
        userScoreElement.textContent = ++userScore;
    }
    else{
        resultText = "EVERYONE IS DEAD!";
        computerScoreElement.textContent = ++computerScore;
        userScoreElement.textContent = ++userScore;
    }

    // set result text
    resultTxtElement.textContent = resultText;

    // set the remaining cards
    remainingCards.textContent = drawings.remaining;

    // if no cards left, display winner
    if (drawings.remaining === 0){
        declareWinner();
    }

    drawBtn.textContent = "DRAW"
    drawBtn.disabled = false;
}

async function drawCards() {
    try{
        const response = await fetch(`${DECK_OF_CARDS_API}/${deckId}/draw/?count=2`);
        
        if(!response.ok){
            throw Error(`Error drawing card deck : ${response.status}`);
        }

        return await response.json();
    }
    catch(error){
        console.log(`Error : ${error.message}`);
        return null;
    }
}

function declareWinner(){
    const resultText = (computerScore > userScore)? "OPPONENT WON THE WAR!" : (userScore > computerScore)? "YOU WON THE WAR!" : "YOU BOTH LOST!";
    gameBanner.querySelector("p").textContent = resultText;

    // remove the previous drawn cards
    computerCard.innerHTML = userCard.innerHTML = ""

    // hide the game container
    gameContainer.classList.add("hidden");

    // display the banner
    gameBanner.classList.remove("remove");

    startBtn.textContent = "PLAY AGAIN!";
}
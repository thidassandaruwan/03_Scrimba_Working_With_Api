// "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
// `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`

const DECK_OF_CARDS_API = "https://apis.scrimba.com/deckofcards/api/deck";

let deckId = null;
let computerScore = 0;
let userScore = 0;


// elements
//btns
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

restartBtn.addEventListener("click", reStartGame)
drawBtn.addEventListener("click", handleRound);

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

async function handleRound() {
    drawBtn.textContent = "DRAWING..."
    drawBtn.disabled = true;

    const drawings = await drawCards();
    if (!drawings){ return; }

    const {image: compCardImg, value: compCardVal} = drawings.cards[0];
    const {image: userCardImg, value: userCardVal} = drawings.cards[1];

    computerCard.innerHTML = `<img src="${compCardImg}"/>`;
    userCard.innerHTML = `<img src="${userCardImg}"/>`;
    
    const result = (compCardVal > userCardVal)? "OPPONENT WON THAT ROUND!" : (userCardVal > compCardVal)? "YOU WON THAT ROUND!" : "EVERYONE IS DEAD!";
    resultTxtElement.textContent = result;

    drawBtn.textContent = "DRAW"
    drawBtn.disabled = false;
}

async function drawCards() {
    try{
        const response = await fetch(`${DECK_OF_CARDS_API}/${deckId}/draw/?count=2`);
        console.log(response);
        
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

function getCardHtml(cardUrl){
    return `<img src=${cardUrl}/>`
}
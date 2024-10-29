// store the file path to image
const cardImgSrc_ARR = [
    "image/2-C.png", "image/2-D.png", "image/2-H.png", "image/2-P.png",
    "image/3-C.png", "image/3-D.png", "image/3-H.png", "image/3-P.png",
    "image/4-C.png", "image/4-D.png", "image/4-H.png", "image/4-P.png",
    "image/5-C.png", "image/5-D.png", "image/5-H.png", "image/5-P.png",
    "image/6-C.png", "image/6-D.png", "image/6-H.png", "image/6-P.png",
    "image/7-C.png", "image/7-D.png", "image/7-H.png", "image/7-P.png",
    "image/8-C.png", "image/8-D.png", "image/8-H.png", "image/8-P.png",
    "image/9-C.png", "image/9-D.png", "image/9-H.png", "image/9-P.png",
    "image/10-C.png", "image/10-D.png", "image/10-H.png", "image/10-P.png",
    "image/A-C.png", "image/A-D.png", "image/A-H.png", "image/A-P.png",
    "image/J-C.png", "image/J-D.png", "image/J-H.png", "image/J-P.png",
    "image/K-C.png", "image/K-D.png", "image/K-H.png", "image/K-P.png",
    "image/Q-C.png", "image/Q-D.png", "image/Q-H.png", "image/Q-P.png"
];

// arr that stores card img as html element 
let cardImgEl_ARR = [];
let cardImgEl_DiscardARR = [];

// the backside of the card
let card_BACKSIDE_IMG;


// Create card img HTML elements and store them into cardImgEl_ARR
function createImgEl() {
    for (let i = 0; i < cardImgSrc_ARR.length; i++) {
        let imgEl = document.createElement('img');
        imgEl.src = cardImgSrc_ARR[i];
        imgEl.className = "card"; // Use className instead of class
        cardImgEl_ARR.push(imgEl);
    }
}

// returns the a random between [0,51]
function getRandNum(){
    return Math.floor(Math.random() * 52);
}

// shuffle the deck of cards
function shuffle(){
    // Replace each card with a random card in the deck, 10 times
    for(let shuffleAmount=0; shuffleAmount<10; shuffleAmount++){
        for(let i=0; i<52; i++){
            const tempCard1 = cardImgEl_ARR[i];
            const randIndex = getRandNum();
            cardImgEl_ARR[i] = cardImgEl_ARR[randIndex];
            cardImgEl_ARR[randIndex] = tempCard1;
        }
    }
}

function printDeck(){
    const deckZoneEl = document.getElementById('deck-zone');
    deckZoneEl.appendChild(cardImgEl_ARR[0]);
}

function dealCardToDealer(){

}

// deals two cards to player's hand
function dealCardToPlayer(numCard){
    const playerHandEl = document.getElementById('player-cards');
    for (let i=0; i<numCard; i++){
        let topCard = cardImgEl_ARR.shift(); // Remove the top card
        playerHandEl.appendChild(topCard); // Add it to player's hand
        cardImgEl_DiscardARR.push(topCard); // Push the card to discard array   
    }
}


window.onload = function() {
    // load backside of card img
    card_BACKSIDE_IMG = document.createElement('img');
    card_BACKSIDE_IMG.src = "image/BACK.png";
    card_BACKSIDE_IMG.className = "card";

    createImgEl();
    shuffle();
    dealCardToPlayer(2);

    const deal_btn = document.getElementById('hit-button').addEventListener('click', ()=>{
        dealCardToPlayer(1);
    });
};

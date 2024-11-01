// store the file path to image
const cardImgSrc_ARR = [
    // number cards
    "image/2-C.png", "image/2-D.png", "image/2-H.png", "image/2-P.png",
    "image/3-C.png", "image/3-D.png", "image/3-H.png", "image/3-P.png",
    "image/4-C.png", "image/4-D.png", "image/4-H.png", "image/4-P.png",
    "image/5-C.png", "image/5-D.png", "image/5-H.png", "image/5-P.png",
    "image/6-C.png", "image/6-D.png", "image/6-H.png", "image/6-P.png",
    "image/7-C.png", "image/7-D.png", "image/7-H.png", "image/7-P.png",
    "image/8-C.png", "image/8-D.png", "image/8-H.png", "image/8-P.png",
    "image/9-C.png", "image/9-D.png", "image/9-H.png", "image/9-P.png",
    "image/10-C.png", "image/10-D.png", "image/10-H.png", "image/10-P.png",

    // face cards
    "image/A-C.png", "image/A-D.png", "image/A-H.png", "image/A-P.png",
    "image/J-C.png", "image/J-D.png", "image/J-H.png", "image/J-P.png",
    "image/K-C.png", "image/K-D.png", "image/K-H.png", "image/K-P.png",
    "image/Q-C.png", "image/Q-D.png", "image/Q-H.png", "image/Q-P.png"
];

const cardImgVal_ARR = [
    2,2,2,2,
    3,3,3,3,
    4,4,4,4,
    5,5,5,5,
    6,6,6,6,
    7,7,7,7,
    8,8,8,8,
    9,9,9,9,
    10,10,10,10,
    'A','A','A','A', //ACE
    10,10,10,10, //Jack face card
    10,10,10,10, //King face card
    10,10,10,10  //Queen face card  
]

// arr that stores card img as html element 
let cardObj_ARR = [];
let cardObjDiscard_ARR = [];

let playerHand = [];
let dealerHand = [];


// Create card img HTML elements and store them into cardImgEl_ARR
function createImgObj() {

    for (let i=0; i<cardImgSrc_ARR.length; i++){

        let cardObj = {
            _img: null,
            _val1: 0,
            _val2: 0
        }

        // assigning img el
        let imgEl = document.createElement('img');
        imgEl.src = cardImgSrc_ARR[i];
        imgEl.className = "card";
        cardObj._img = imgEl;

        // assigning face value
        if (cardImgVal_ARR[i] !== 'A') // any face cards and number cards
            cardObj._val1 = cardImgVal_ARR[i];
        else{ // card is an Ace
            cardObj._val1 = 1;
            cardObj._val2 = 11;
        }
    
        cardObj_ARR.push(cardObj);
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
            const tempCard1 = cardObj_ARR[i];
            const randIndex = getRandNum();
            cardObj_ARR[i] = cardObj_ARR[randIndex];
            cardObj_ARR[randIndex] = tempCard1;
        }
    }
}

// deals card(s) to dealer's hand
function dealCardToDealer(numCard){
    const dealerHandEl = document.getElementById('dealer-cards');
    for (let i=0; i<numCard; i++){
        let topCard = cardObj_ARR.shift(); // Remove the top card
        dealerHandEl.appendChild(topCard._img); // Add it to dealers's hand
        dealerHand.push(topCard);
        cardObjDiscard_ARR.push(topCard); // Push the card to discard array   
    }
    computeHand();
}

// deals card(s) to player's hand
function dealCardToPlayer(numCard){
    const playerHandEl = document.getElementById('player-cards');
    for (let i=0; i<numCard; i++){
        let topCard = cardObj_ARR.shift(); // Remove the top card
        playerHandEl.appendChild(topCard._img); // Add it to player's hand
        playerHand.push(topCard);
        cardObjDiscard_ARR.push(topCard); // Push the card to discard array   
    }
    computeHand();
}

function debug(){
    for(let i=0; i<cardObj_ARR.length;i++)
        console.log(cardObj_ARR[i]._img, cardObj_ARR[i]._val1, cardObj_ARR[i]._val2 > 0 ? cardObj_ARR[i]._val2:"-");
}

function computeHand(){
    const playerScoreEl = document.getElementById('player-score');
    const dealerScoreEl = document.getElementById('dealer-score');
    let playerScore = 0;
    let dealerScore = 0;

    playerHand.forEach(card =>{
        playerScore += card._val1;
    });
    dealerHand.forEach(card =>{
        dealerScore += card._val1;
    });

    playerScoreEl.textContent = playerScore;
    dealerScoreEl.textContent = dealerScore;
}
    
window.onload = function() {
    createImgObj();
    shuffle();
    dealCardToPlayer(2);
    dealCardToDealer(2);
    // debug();

    // User action
    const hit_btn = document.getElementById('hit-button').addEventListener('click', ()=>{
        dealCardToPlayer(1);
        computeHand();
    });
};

/**
 * C = Clubs
 * D = Diamonds
 * H = Hearts
 * S = Spades
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerScore = 0;
let machineScore = 0;

// HTML References
const btnNewGame = document.querySelector('#btnNewGame');
const btnNewCard = document.querySelector('#btnNewCard');
const btnStop = document.querySelector('#btnStop');

const divPlayerCards = document.querySelector('#player-cards');
const divMachineCards = document.querySelector('#machine-cards');

const scoresHTML = document.querySelectorAll('small');

// Create a new deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }

    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}

createDeck();

// Get a card
const getCard = () => {

    if (deck.length === 0) {
        throw 'Deck do not has more cards';
    }

    const card = deck.pop();

    return card;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return (isNaN(value))
                ? (value === 'A') ? 11 : 10
                : value * 1;
}

// Machine turn
const machineTurn = (minScore) => {
    do {
        const card = getCard();
        const cardImg = document.createElement('img');

        machineScore += cardValue(card);
        scoresHTML[1].innerHTML = machineScore;

        cardImg.src = `assets/img/${card}.png`;
        cardImg.classList.add('bj-card');

        divMachineCards.append(cardImg);

        if (minScore > 21) {
            break;
        }
    } while ((machineScore < minScore) && (minScore <= 21));

    setTimeout(() => {
        if (machineScore === minScore) {
            alert('No one won :(');
        } else if (minScore > 21) {
            alert('Machine won! :(');
        } else if (machineScore > 21) {
            alert('Player won! :)');
        } else {
            alert('Machine won! :(');
        }
    }, 20);   
}

// Events
btnNewCard.addEventListener('click', () => {
    const card = getCard();
    const cardImg = document.createElement('img');

    playerScore += cardValue(card);
    scoresHTML[0].innerHTML = playerScore;

    cardImg.src = `assets/img/${card}.png`;
    cardImg.classList.add('bj-card');

    divPlayerCards.append(cardImg);

    if (playerScore > 21) {
        btnNewCard.disabled = true;
        btnStop.disabled = true;
        machineTurn(playerScore);
    } else if (playerScore === 21) {
        btnNewCard.disabled = true;
        btnStop.disabled = true;
        machineTurn(playerScore);
    }
});

btnStop.addEventListener('click', () => {
    btnNewCard.disabled = true;
    btnStop.disabled = true;
    machineTurn(playerScore);
});

btnNewGame.addEventListener('click', () => {
    console.clear();

    deck = [];
    deck = createDeck();

    playerScore = 0;
    machineScore = 0;

    scoresHTML[0].innerText = 0;
    scoresHTML[1].innerText = 0;

    divMachineCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnNewCard.disabled = false;
    btnStop.disabled = false;
});
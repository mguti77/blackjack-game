// Module pattern

const module = (() => {
    'use strict';

    /**
     * C = Clubs
     * D = Diamonds
     * H = Hearts
     * S = Spades
     */

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];
    
    let playersScore = [];
    
    // HTML References
    const btnNewGame = document.querySelector('#btnNewGame'),
          btnNewCard = document.querySelector('#btnNewCard'),
          btnStop = document.querySelector('#btnStop');
    
    const divCards = document.querySelectorAll('.divCards'),
          scoresHTML = document.querySelectorAll('small');
    
    // Initialize the Game
    const initializeGame = (numPlayers = 2) => {
        deck = createDeck();
        playersScore = [];

        for (let i = 0; i < numPlayers; i++) {
            playersScore.push(0);
        }

        scoresHTML.forEach(element => element.innerText = 0);
        divCards.forEach(element => element.innerHTML = '');

        btnNewCard.disabled = false;
        btnStop.disabled = false;
    }

    // Create a new deck
    const createDeck = () => {
        deck = [];

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
    
        return _.shuffle(deck);;
    }
    
    // Get a card
    const getCard = () => {
        if (deck.length === 0) {
            throw 'Deck do not has more cards';
        }
    
        return deck.pop();
    }
    
    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
    
        return (isNaN(value))
                    ? (value === 'A') ? 11 : 10
                    : value * 1;
    }
    
    // Turn: 0 = Player 1, last is the machine
    const accumulateScores = (card, turn) => {
        playersScore[turn] += cardValue(card);
        scoresHTML[turn].innerText = playersScore[turn];

        return playersScore[turn];
    }

    // Create card in HTML
    const addCard = (card, turn) => {
        const cardImg = document.createElement('img');
                
        cardImg.src = `assets/img/${card}.png`;
        cardImg.classList.add('bj-card');
    
        divCards[turn].append(cardImg);
    }

    // Determine the Winner
    const determineWinner = () => {
        const [minScore, machineScore] = playersScore;

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
        }, 100);  
    }

    // Machine turn
    const machineTurn = (minScore) => {
        let machineScore = 0;

        do {
            const card = getCard();
            machineScore = accumulateScores(card, playersScore.length - 1);
            
            addCard(card, playersScore.length - 1);

        } while ((machineScore < minScore) && (minScore <= 21));

        determineWinner();
    }
    
    // Events
    btnNewCard.addEventListener('click', () => {
        const card = getCard();
        const playerScore = accumulateScores(card, 0);
    
        addCard(card, 0);
    
        if (playerScore >= 21 ) {
            btnNewCard.disabled = true;
            btnStop.disabled = true;

            machineTurn(playerScore);
        }
    });
    
    btnStop.addEventListener('click', () => {
        btnNewCard.disabled = true;
        btnStop.disabled = true;

        machineTurn(playersScore[0]);
    });
    
    btnNewGame.addEventListener('click', () => {
        initializeGame();
    });

    return {
        newGame: initializeGame
    };
})();
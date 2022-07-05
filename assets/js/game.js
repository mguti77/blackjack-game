/**
 * C = Clubs
 * D = Diamonds
 * H = Hearts
 * S = Spades
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    console.log(card);

    return card;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return (isNaN(value))
                ? (value === 'A') ? 11 : 10
                : value * 1;
}

const value = cardValue(getCard());
console.log({ value });
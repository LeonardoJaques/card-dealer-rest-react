import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    //make a request using deck id
    try {
      let deck_id = this.state.deck.deck_id;
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);

      if (!cardRes.data.success) {
        throw new Error('No card remaing!');
      }

      let card = cardRes.data.cards[0];
      //set state using new card info from api
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} OF ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className="Deck">
        <div>
          <h1 className="Deck-title">♦ Card Dealer ♦</h1>
          <h2 className="Deck-subtitle">♦ A litter demo made with React ♦</h2>
        </div>
        <button className="Deck-btn" onClick={this.getCard}>
          GET CARD!
        </button>
        <div className="Deck-cardArea">{cards}</div>
      </div>
    );
  }
}

export default Deck;

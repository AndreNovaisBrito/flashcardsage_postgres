import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { TDeck } from './api/getDecks';
import createCard from './api/createCard';
import getCards from './api/getCards';
import deleteCard from './api/deleteCard';
import './Deck.css'



export default function Deck(){
    const [cards, setCards] = useState<TDeck[]>([]);
    const [title, setTitle] = useState('');
    const { deckId } = useParams();
    async function handleCreateCard(e: React.FormEvent){
      e.preventDefault();
      const card = await createCard(title, deckId!);
      setCards([...cards, card]);
      setTitle("");
    }
  
    async function handleDeleteCard(cardId: string){
      await deleteCard(cardId);
      setCards(cards.filter((card)=>card.id !== cardId))
    } 
  
    useEffect(()=>{
      async function fetchCards(){
        const newCards = await getCards(deckId!);
        setCards(newCards);
      }
      fetchCards();
    },[])
  
  
    return (
      <div className="Deck">
        <h1>Cards</h1>
        <ul className='cards'>
          {
            cards.map((card, index)=>(
                <li key={index}>                
                    <button onClick={()=>handleDeleteCard(card.id)}>X</button>
                {card.title}
                </li>          
            ))
          }
        </ul>
        <form onSubmit={handleCreateCard}>
          <label htmlFor="card-title">Card Title</label>
          <input 
            id='card-title'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
              setTitle(e.target.value);
              }
            }
           />
           <button>Create Deck</button>
        </form>
      </div>
    )
  }
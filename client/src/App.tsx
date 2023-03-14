import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from "react-router-dom";
import deleteDeck from './api/deleteDeck';
import createDeck from './api/createDeck';
import getDecks, { TDeck } from './api/getDecks';




function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('');
  
  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string){
    await deleteDeck(deckId);
    setDecks(decks.filter((deck)=>deck.id !== deckId))
  } 

  useEffect(()=>{
    async function fetchDecks(){
      const newDecks = await getDecks();
      setDecks(newDecks);

    }
    fetchDecks();
  },[])


  return (
    <div className="App">
      <h1>Decks</h1>
      <ul className='decks'>
        {
          decks.map((deck, index)=>(
              <li key={index}>                
              <button onClick={()=>handleDeleteDeck(deck.id)}>X</button>
              <Link to={`cards/${deck.id}`}>{deck.title}</Link>
              </li>          
          ))
        }
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input 
          id='deck-title'
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

export default App

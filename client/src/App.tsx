import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('');
  
  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    const response = await fetch('http://localhost:5000/decks', {
      headers:{
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
    })
    const deck = await response.json();
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string){
    const response = await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: 'DELETE',
    });
    const deletedId = await response.json()
    setDecks(decks.filter((deck)=>deck._id !== deckId))
  } 

  useEffect(()=>{
    async function fetchDecks(){
      const response = await fetch('http://localhost:5000/decks');
      const newDecks = await response.json();
      setDecks(newDecks);

    }
    fetchDecks();
  },[decks])


  return (
    <div className="App">
      <ul className='decks'>
        {
          decks.map((deck, index)=>(
              <li key={index}>                
              <button onClick={()=>handleDeleteDeck(deck.id)}>X</button>
              {deck.title}
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

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// function Deck({id}){
//   return(
//     <li>Hey</li>
//   )
// }

function App() {
  const [title, setTitle] = useState('');
  // const [deck, setDeck] = useState('');

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      headers:{
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
    })
    setTitle('');
  }
  return (
    <div className="App">
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

import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export default async function createCard(title: string, deckId: string):Promise<TDeck>{
    const response =await fetch(`${API_URL}/cards/${deckId}`, {
      headers:{
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        title,
        deckId
      }),
    })
    return response.json();
}
import { API_URL } from "./config";

export default async function createDeck(title: string){
    const response =await fetch(`${API_URL}/decks`, {
      headers:{
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
    })
    return response.json();
}
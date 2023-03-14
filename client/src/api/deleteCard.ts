import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export default async function deleteCard(cardId: string):Promise<TDeck>{
    const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: 'DELETE',
      });
    return response.json();
}
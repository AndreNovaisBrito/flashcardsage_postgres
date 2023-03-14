import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export default async function getCards(deckId : string):Promise<TDeck[]>{
    const response = await fetch(`${API_URL}/cards/${deckId}`);
    return response.json();
}
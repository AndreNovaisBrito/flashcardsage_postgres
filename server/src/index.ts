import express,{Request, Response} from "express";
import bodyParser from 'body-parser'
const port = 5000
import db from './queries'
import cors from 'cors';


const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//Decks
app.get('/decks', db.getDecks)
app.get('/decks/:id', db.getDeckById )
app.post('/decks', db.createDeck)
app.put('/decks/:id', db.updateDeck)
app.delete('/decks/:id', db.deleteDeck)

//Cards
app.get('/cards/:deckId', db.getCardsFromDeck)
app.post('/cards/:deckId', db.createCard)
app.delete('/cards/:cardId', db.deleteCard)



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })


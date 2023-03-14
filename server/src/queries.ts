import express,{Request, Response} from "express";

const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})

const getDecks = (request: Request, response: Response): void => {
    pool.query('SELECT * FROM decks ORDER BY id ASC', (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getDeckById = (request: Request, response: Response):void => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM decks WHERE id = $1', [id], (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    })
  }

  const createDeck = (request: Request, response: Response):void => {
    const { title } = request.body
  
    pool.query('INSERT INTO decks (title) VALUES ($1) RETURNING *', [title], (error: Error, results: any) => {
      if (error) {
        throw error
      }
      console.log(results.rows[0]);
      response.status(201).send(results.rows[0])
    })
  }
  const updateDeck = (request: Request, response: Response):void => {
    const id = parseInt(request.params.id)
    const { title } = request.body
  
    pool.query(
      'UPDATE decks SET title = $1 WHERE id = $2',
      [title, id],
      (error: Error, results: any) => {
        if (error) {
          throw error
        }
        response.status(200).send({title: title, id: id})
      }
    )
  }

  const deleteDeck = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM decks WHERE id = $1', [id], (error: Error, results: any):void => {
      if (error) {
        throw error
      }
      response.status(200).send({id: id})
    })
  }

 

  export default module.exports = {
    getDecks,
    getDeckById,
    createDeck,
    updateDeck,
    deleteDeck
  }
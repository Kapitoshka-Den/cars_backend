import express, { Express } from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { CarController } from './controllers/car.controller'
import { CarService } from './services/car.service'

export async function Server() {
  const server: Express = express()
  const port: number = process.env.PORT
  const database_url = process.env.MONGODB_CONNECT_URL

  const dbClient = new MongoClient(database_url!)
  let connect = await dbClient.connect()
  const database = connect.db('hrTest')

  const carService = new CarService(database)

  server.use(express.json())
  server.use(cors())
  server.use('/cars', CarController(carService))

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

import { Request, Response, Router } from 'express'
import { CarFilter, CarService } from '../services/car.service'
import { ICar } from '../models/car.model'
import { CarDTO } from '../dto/cars.dto'

export function CarController(service: CarService): Router {
  const car_router = Router()

  car_router.get(
    '/',
    async (req: Request<{}, {}, {}, CarFilter>, res: Response) => {
      let filter: CarFilter = req.query
      filter.pageSize = Number(req.query.pageSize) || 20
      filter.pageNumber = Number(req.query.pageNumber) || 1
      let cars: CarDTO | undefined
      try {
        cars = await service.findAll(filter)
        if (!cars) {
          res.status(404).send('Car not found')
        } else {
          res.status(200).send(cars)
        }
      } catch (error) {
        res.status(500).send('Internal server error:' + error)
      }
    }
  )

  car_router.get('/marks', async (req, res) => {
    try {
      res.status(200).send(await service.countByMark())
    } catch (error) {
      res.status(500).send('Internal server error:' + error)
    }
  })

  car_router.get(
    '/models',
    async (req: Request<{}, {}, {}, { mark: string }>, res) => {
      const mark = req.query.mark
      try {
        const test = await service.getModels(mark)
        res.status(200).send(test)
      } catch (error) {
        res.status(500).send('Internal server error:' + error)
      }
    }
  )

  return car_router
}

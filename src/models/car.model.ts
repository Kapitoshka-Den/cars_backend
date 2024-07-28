import { IEngine } from './engine.model'

export interface ICar {
  mark: string
  model: string | null
  engine: IEngine
  drive: string | null
  price: number
  createAt: Date
}

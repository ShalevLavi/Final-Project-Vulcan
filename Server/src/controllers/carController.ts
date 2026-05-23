import { Request, Response } from 'express'
import Car from '../models/Car'

export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.find()
    res.status(200).json({ cars })
  } catch (error) {
    console.error('Get cars error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
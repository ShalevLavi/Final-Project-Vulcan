import { Router } from 'express'
import { getAllCars } from '../controllers/carController'

const router = Router()

router.get('/', getAllCars)

export default router
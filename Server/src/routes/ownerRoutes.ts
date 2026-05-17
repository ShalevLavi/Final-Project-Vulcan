import { Router } from 'express'
import { getCar } from '../controllers/ownerController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.get('/car', protect, getCar)

export default router
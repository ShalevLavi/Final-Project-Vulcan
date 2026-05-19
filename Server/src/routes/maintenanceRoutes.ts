import { Router } from 'express'
import { getMaintenance, requestMaintenance } from '../controllers/maintenanceController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.get('/', protect, getMaintenance)
router.post('/', protect, requestMaintenance)

export default router
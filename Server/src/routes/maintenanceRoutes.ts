import { Router } from 'express'
import { getMaintenance, requestMaintenance, deleteMaintenance  } from '../controllers/maintenanceController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.get('/', protect, getMaintenance)
router.post('/', protect, requestMaintenance)
router.delete('/:id', protect, deleteMaintenance)
export default router
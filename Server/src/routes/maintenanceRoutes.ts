import { Router } from 'express'
import { getMaintenance, requestMaintenance, deleteMaintenance, updateMaintenance  } from '../controllers/maintenanceController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.get('/', protect, getMaintenance)
router.post('/', protect, requestMaintenance)
router.delete('/:id', protect, deleteMaintenance)
router.put('/:id', protect, updateMaintenance)
export default router
import { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'
import Maintenance from '../models/Maintenance'

export const getMaintenance = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const maintenance = await Maintenance.find({ ownerId: req.ownerId }).sort({ createdAt: -1 })

        res.status(200).json({ maintenance })

    } catch (error) {
        console.error('Get maintenance error:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const requestMaintenance = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { serviceName, date } = req.body

        if (!serviceName || !date) {
            res.status(400).json({ error: 'Service name and date are required' })
            return
        }

        const allowedServices = [
            'Oil Change',
            'Brake Inspection',
            'Tire Rotation & Alignment',
            'Full Vehicle Inspection',
            'Air Filter Replacement',
            'Brake Fluid Change',
            'Battery Check',
            'Wheel Alignment',
            'Transmission Service',
            'Coolant Flush',
        ]

        if (!allowedServices.includes(serviceName)) {
            res.status(400).json({ error: 'Invalid service selected' })
            return
        }

        const maintenance = await Maintenance.create({
            ownerId: req.ownerId,
            serviceName,
            date,
            status: 'pending',
        })

        res.status(201).json({ maintenance })

    } catch (error) {
        console.error('Request maintenance error:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const deleteMaintenance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const maintenance = await Maintenance.findById(req.params.id)

    if (!maintenance) {
      res.status(404).json({ error: 'Maintenance record not found' })
      return
    }

    if (maintenance.status !== 'pending') {
      res.status(400).json({ error: 'Can only delete pending requests' })
      return
    }

    if (maintenance.ownerId.toString() !== req.ownerId) {
      res.status(403).json({ error: 'Unauthorized' })
      return
    }

    await maintenance.deleteOne()
    res.status(200).json({ message: 'Deleted successfully' })

  } catch (error) {
    console.error('Delete maintenance error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
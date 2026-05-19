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
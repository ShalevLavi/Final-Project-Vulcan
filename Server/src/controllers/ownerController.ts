import { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'
import Owner from '../models/Owner'
import Car from '../models/Car'

export const getCar = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const owner = await Owner.findById(req.ownerId).populate('carId')

        if (!owner) {
            res.status(404).json({ error: 'Owner not found' })
            return
        }

        res.status(200).json({
            owner: {
                name: owner.ownerName,
                vinLast4: owner.vinLast4,
                lastService: owner.lastService,
                nextService: owner.nextService,
                year: owner.year,
            },
            car: owner.carId,
        })
    }
    catch (error) {
        console.error('Get car error:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

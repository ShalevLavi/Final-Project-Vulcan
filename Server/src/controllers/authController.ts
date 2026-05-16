import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Owner from '../models/Owner'

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ownerName, vinLast4 } = req.body

        if (!ownerName || !vinLast4) {
            res.status(400).json({ error: 'Name and last 4 digits of VIN are required' })
            return
        }
        if (!/^[A-Za-z0-9]{4}$/.test(vinLast4)) {
            res.status(400).json({ error: 'Last 4 digits of VIN must be alphanumeric' })
            return
        }
        if (!/^[A-Za-z ]+$/.test(ownerName)) {
            res.status(400).json({ error: 'Owner name must contain only letters' })
            return
        }

        const owner = await Owner.findOne({
            ownerName: ownerName.trim(),
            vinLast4: vinLast4.toUpperCase(),
        }).populate('carId')

        if (!owner) {
            res.status(401).json({ error: 'Invalid name or VIN' })
            return
        }

        const token = jwt.sign(
            { ownerId: owner._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        res.status(200).json({
            token,
            owner: {
                name: owner.ownerName,
                vinLast4: owner.vinLast4,
            },
            car: owner.carId,
        })

    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}
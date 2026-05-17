import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    ownerId?: string
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No Token Provided' })
            return
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { ownerId: string }

        req.ownerId = decoded.ownerId

        next()
    } catch (error) {
        console.error('Token verification error:', error)
        res.status(401).json({ error: 'Invalid Token' })
    }
} 
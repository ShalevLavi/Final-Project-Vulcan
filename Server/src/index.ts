import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoutes from './routes/authRoutes'
import ownerRoutes from './routes/ownerRoutes'
import './models/Car'
import './models/Owner'
import maintenanceRoutes from './routes/maintenanceRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/owner', ownerRoutes)
app.use('/api/owner/maintenance', maintenanceRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Vulcan API is running' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoutes from './routes/authRoutes'
import ownerRoutes from './routes/ownerRoutes'
import carRoutes from './routes/carRoutes'
import './models/Car'
import './models/Owner'
import maintenanceRoutes from './routes/maintenanceRoutes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { getAIReply } from './config/groq'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/owner', ownerRoutes)
app.use('/api/owner/maintenance', maintenanceRoutes)
app.use('/api/cars', carRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Vulcan API is running' })
})

//Socket.io

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`)

  socket.on('joinRoom', (ownerId: string) => {
    socket.join(ownerId)
    console.log(`Owner ${ownerId} joined their room`)
  })

  socket.on('sendMessage', async (data: { 
    ownerId: string
    text: string
    from: 'owner' | 'support'
    carModel: string
    ownerName: string 
  }) => {
    try {
      const Message = (await import('./models/Message')).default
      
      // Savein the owner's message
      const ownerMessage = await Message.create({
        ownerId: data.ownerId,
        text: data.text,
        from: 'owner',
      })

      // Sending the owner's message back to room
      io.to(data.ownerId).emit('receiveMessage', {
        from: 'owner',
        text: data.text,
        _id: ownerMessage._id,
      })

      // Get AI's reply
      const aiReply = await getAIReply(data.text, data.carModel, data.ownerName)

      // Save AI's reply
      const supportMessage = await Message.create({
        ownerId: data.ownerId,
        text: aiReply,
        from: 'support',
      })

      // Sends the AI's reply to room
      io.to(data.ownerId).emit('receiveMessage', {
        from: 'support',
        text: aiReply,
        _id: supportMessage._id,
      })

    } catch (error) {
      console.error('Message error:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`)
  })
})

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Auth API', () => {

  describe('POST /api/auth/login', () => {

    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev Lavi', vinLast4: 'X4K9' })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('owner')
      expect(res.body).toHaveProperty('car')
    })

    it('should return 401 with invalid name', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Wrong Name', vinLast4: 'X4K9' })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
    })

    it('should return 401 with invalid VIN', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev Lavi', vinLast4: 'XXXX' })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
    })

    it('should return 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ vinLast4: 'X4K9' })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })

    it('should return 400 when VIN is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev Lavi' })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })

    it('should return 400 when VIN is not 4 characters', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev Lavi', vinLast4: 'X4' })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })

    it('should return 400 when name contains numbers', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev123', vinLast4: 'X4K9' })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })

    it('should be case insensitive for owner name', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'shalev lavi', vinLast4: 'X4K9' })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('owner')
      expect(res.body).toHaveProperty('car')
    })

    it('should return owner data with correct name', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev Lavi', vinLast4: 'X4K9' })

      expect(res.body.owner.name).toBe('Shalev Lavi')
    })

    it('should return car data after login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ ownerName: 'Shalev Lavi', vinLast4: 'X4K9' })

      expect(res.body.car).toHaveProperty('carModel')
      expect(res.body.car).toHaveProperty('horsepower')
    })

  })

})
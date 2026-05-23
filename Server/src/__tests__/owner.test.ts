import dotenv from 'dotenv'
dotenv.config()

import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string)

  // Login first to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({ ownerName: 'Shalev Lavi', vinLast4: 'X4K9' })

  token = res.body.token
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Owner API', () => {

  describe('GET /api/owner/car', () => {

    it('should return car data with valid token', async () => {
      const res = await request(app)
        .get('/api/owner/car')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('owner')
      expect(res.body).toHaveProperty('car')
    })

    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/owner/car')
      expect(res.status).toBe(401)
    })

    it('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/api/owner/car')
        .set('Authorization', 'Bearer invalidtoken123')
      expect(res.status).toBe(401)
    })

    it('should return correct owner name', async () => {
      const res = await request(app)
        .get('/api/owner/car')
        .set('Authorization', `Bearer ${token}`)
      expect(res.body.owner.name).toBe('Shalev Lavi')
    })

    it('should return car with positive horsepower', async () => {
      const res = await request(app)
        .get('/api/owner/car')
        .set('Authorization', `Bearer ${token}`)
      expect(res.body.car.horsepower).toBeGreaterThan(0)
    })

  })

  describe('GET /api/owner/maintenance', () => {

    it('should return maintenance list with valid token', async () => {
      const res = await request(app)
        .get('/api/owner/maintenance')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('maintenance')
      expect(Array.isArray(res.body.maintenance)).toBe(true)
    })

    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/owner/maintenance')
      expect(res.status).toBe(401)
    })

    it('should return maintenance items with correct fields', async () => {
      const res = await request(app)
        .get('/api/owner/maintenance')
        .set('Authorization', `Bearer ${token}`)
      
      if (res.body.maintenance.length > 0) {
        const item = res.body.maintenance[0]
        expect(item).toHaveProperty('serviceName')
        expect(item).toHaveProperty('date')
        expect(item).toHaveProperty('status')
      }
    })

  })

})
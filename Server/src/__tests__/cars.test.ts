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

describe('Cars API', () => {

  describe('GET /api/cars', () => {

    it('should return all cars', async () => {
      const res = await request(app).get('/api/cars')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('cars')
      expect(Array.isArray(res.body.cars)).toBe(true)
    })

    it('should return 5 cars', async () => {
      const res = await request(app).get('/api/cars')
      expect(res.body.cars.length).toBe(5)
    })

    it('should return cars with correct fields', async () => {
      const res = await request(app).get('/api/cars')
      const car = res.body.cars[0]
      expect(car).toHaveProperty('carModel')
      expect(car).toHaveProperty('horsepower')
      expect(car).toHaveProperty('engineSize')
      expect(car).toHaveProperty('safetyLevel')
      expect(car).toHaveProperty('availableColors')
      expect(car).toHaveProperty('startingPrice')
    })

    it('should return cars with valid safety level between 1 and 8', async () => {
      const res = await request(app).get('/api/cars')
      res.body.cars.forEach((car: any) => {
        expect(car.safetyLevel).toBeGreaterThanOrEqual(1)
        expect(car.safetyLevel).toBeLessThanOrEqual(8)
      })
    })

    it('should return cars with positive horsepower', async () => {
      const res = await request(app).get('/api/cars')
      res.body.cars.forEach((car: any) => {
        expect(car.horsepower).toBeGreaterThan(0)
      })
    })

    it('should return cars with positive starting price', async () => {
      const res = await request(app).get('/api/cars')
      res.body.cars.forEach((car: any) => {
        expect(car.startingPrice).toBeGreaterThan(0)
      })
    })

    it('should return cars with at least one available color', async () => {
      const res = await request(app).get('/api/cars')
      res.body.cars.forEach((car: any) => {
        expect(car.availableColors.length).toBeGreaterThan(0)
      })
    })

    it('should return cars belonging to offroad or luxury collection', async () => {
      const res = await request(app).get('/api/cars')
      res.body.cars.forEach((car: any) => {
        expect(['offroad', 'luxury']).toContain(car.carCollection)
      })
    })

    it('should return 2 offroad cars', async () => {
      const res = await request(app).get('/api/cars')
      const offroad = res.body.cars.filter((c: any) => c.carCollection === 'offroad')
      expect(offroad.length).toBe(2)
    })

    it('should return 3 luxury cars', async () => {
      const res = await request(app).get('/api/cars')
      const luxury = res.body.cars.filter((c: any) => c.carCollection === 'luxury')
      expect(luxury.length).toBe(3)
    })

  })

})
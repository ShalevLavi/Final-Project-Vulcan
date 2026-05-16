import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Car from '../models/Car'
import Owner from '../models/Owner'

dotenv.config()

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log('Connected to MongoDB')

        // Clear existing data
        await Car.deleteMany({})
        await Owner.deleteMany({})
        console.log('Cleared existing data')

        // Create cars
        const zaurus = await Car.create({
            carModel: 'Zaurus',
            year: 2024,
            color: 'Midnight Black',
            horsepower: 520,
            vin: 'VLCN2024X4K9',
            mileage: 24500,
            lastService: 'Mar 2024',
            nextService: 'Sep 2024',
            carCollection: 'offroad',
        })

        const orinex = await Car.create({
            carModel: 'Orinex',
            year: 2024,
            color: 'Arctic White',
            horsepower: 430,
            vin: 'VLCN2024B3M7',
            mileage: 12000,
            lastService: 'Jan 2024',
            nextService: 'Jul 2024',
            carCollection: 'offroad',
        })

        const grenyx = await Car.create({
            carModel: 'Grenyx',
            year: 2024,
            color: 'Midnight Blue',
            horsepower: 390,
            vin: 'VLCN2024C5P2',
            mileage: 8000,
            lastService: 'Feb 2024',
            nextService: 'Aug 2024',
            carCollection: 'luxury',
        })

        const evion = await Car.create({
            carModel: 'Evion',
            year: 2024,
            color: 'Phantom Grey',
            horsepower: 450,
            vin: 'VLCN2024D7R4',
            mileage: 15000,
            lastService: 'Apr 2024',
            nextService: 'Oct 2024',
            carCollection: 'luxury',
        })

        const umbrix = await Car.create({
            carModel: 'Umbrix',
            year: 2024,
            color: 'Carbon Black',
            horsepower: 600,
            vin: 'VLCN2024E9T6',
            mileage: 5000,
            lastService: 'May 2024',
            nextService: 'Nov 2024',
            carCollection: 'luxury',
        })

        // Create owners
        await Owner.create({
            ownerName: 'Shalev Lavi',
            vinLast4: 'X4K9',
            carId: zaurus._id,
        })

        await Owner.create({
            ownerName: 'Nataly Demasov',
            vinLast4: 'B3M7',
            carId: orinex._id,
        })

        await Owner.create({
            ownerName: 'Hen Naim',
            vinLast4: 'C5P2',
            carId: grenyx._id,
        })

        await Owner.create({
            ownerName: 'Ariel Ben-Shushan',
            vinLast4: 'D7R4',
            carId: evion._id,
        })

        await Owner.create({
            ownerName: 'Lior Levi',
            vinLast4: 'E9T6',
            carId: umbrix._id,
        })

        console.log('Database seeded successfully!')
        console.log('Test owners:')
        console.log('  Shalev Lavi — VIN: X4K9 (Zaurus)')
        console.log('  Nataly Demasov — VIN: B3M7 (Orinex)')
        console.log('  Hen Naim — VIN: C5P2 (Grenyx)')
        console.log('  Ariel Ben-Shushan — VIN: D7R4 (Evion)')
        console.log('  Lior Levi — VIN: E9T6 (Umbrix)')

        process.exit(0)
    } catch (error) {
        console.error('Seed error:', error)
        process.exit(1)
    }
}

seedDatabase()
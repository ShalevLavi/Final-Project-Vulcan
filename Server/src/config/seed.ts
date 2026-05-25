import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Car from '../models/Car'
import Owner from '../models/Owner'
import Maintenance from '../models/Maintenance'

dotenv.config()

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log('Connected to MongoDB')

        await mongoose.connection.useDb('vulcan').collection('cars').dropIndexes()
        console.log('Dropped car indexes')

        // Clear existing data
        await Car.deleteMany({})
        await Owner.deleteMany({})
        await Maintenance.deleteMany({})
        console.log('Cleared existing data')

        // Create cars
        const zaurus = await Car.create({
            carModel: 'Zaurus',
            horsepower: 620,
            engineSize: '5L V6 SuperCharged',
            safetyLevel: 8,
            carCollection: 'offroad',
            availableColors: ['Desert Sand', 'Olive Green', 'Gunmetal Grey', 'White', 'Black', 'Deep Metallic Blue'],
            startingPrice: 1100000,
            image: '/Cars/Zaurus.png'
        })

        const orinex = await Car.create({
            carModel: 'Orinex',
            horsepower: 560,
            engineSize: '4L I6 Twin Turbo',
            safetyLevel: 7,
            carCollection: 'offroad',
            availableColors: ['Desert Sand', 'Olive Green', 'Gunmetal Grey', 'White', 'Black', 'Deep Metallic Blue'],
            startingPrice: 900000,
            image: '/Cars/Orinex.png'
        })

        const grenyx = await Car.create({
            carModel: 'Grenyx',
            horsepower: 820,
            engineSize: '5L V10 Twin Turbo',
            safetyLevel: 7,
            carCollection: 'luxury',
            availableColors: ['Pearl White', 'Deep Black Metallic', 'Champagne Silver', 'Deep Metallic Blue'],
            startingPrice: 2300000,
            image: '/Cars/Grenyx.png'
        })

        const evion = await Car.create({
            carModel: 'Evion',
            horsepower: 750,
            engineSize: '6L V12 Twin Turbo',
            safetyLevel: 8,
            carCollection: 'luxury',
            availableColors: ['Pearl White', 'Deep Black Metallic', 'Champagne Silver', 'Deep Metallic Blue'],
            startingPrice: 3500000,
            image: '/Cars/Evion.png'
        })

        const umbrix = await Car.create({
            carModel: 'Umbrix',
            horsepower: 1555,
            engineSize: '8L W16 Quad Turbo',
            safetyLevel: 8,
            carCollection: 'luxury',
            availableColors: ['Pearl White', 'Deep Black Metallic', 'Champagne Silver', 'Deep Metallic Blue'],
            startingPrice: 25000000,
            image: '/Cars/Umbrix.png'
        })
        
        const carCount = await Car.countDocuments()
        console.log(`Cars created: ${carCount}`)

        // Create owners
        await Owner.create({
            ownerName: 'Shalev Lavi',
            vin: '1FTFW1EF9BKD5X4K9',
            carId: umbrix._id,
            year: 2023,
            mileage: 2230,
            lastService: 'Apr 2024',
            carColor: 'Deep Black Metallic',
        })

        await Owner.create({
            ownerName: 'Nataly Demasov',
            vin: '3GTEC13C88G29B3M7',
            carId: orinex._id,
            year: 2024,
            mileage: 5560,
            lastService: 'Jan 2025',
            carColor: 'Desert Sand',
        })

        await Owner.create({
            ownerName: 'Hen Naim',
            vin: '1G6DA1E31C017C5P2',
            carId: grenyx._id,
            year: 2026,
            mileage: 250,
            lastService: 'May 2026',
            carColor: 'Pearl White',
        })

        await Owner.create({
            ownerName: 'Ariel Shushan',
            vin: '1FM5K8D81DGA0D7R4',
            carId: evion._id,
            year: 2025,
            mileage: 1500,
            lastService: 'Apr 2026',
            carColor: 'Champagne Silver',
        })

        await Owner.create({
            ownerName: 'Lior Levi',
            vin: '3CZRE4H51BG77E9T6',
            carId: zaurus._id,
            year: 2025,
            mileage: 1250,
            lastService: 'Jun 2025',
            carColor: 'Gunmetal Grey',
        })

        await Maintenance.deleteMany({})

        const shalevOwner = await Owner.findOne({ vin: '1FTFW1EF9BKD5X4K9' })
        const natalyOwner = await Owner.findOne({ vin: '3GTEC13C88G29B3M7' })
        const henOwner = await Owner.findOne({ vin: '1G6DA1E31C017C5P2' })
        const arielOwner = await Owner.findOne({ vin: '1FM5K8D81DGA0D7R4' })
        const liorOwner = await Owner.findOne({ vin: '3CZRE4H51BG77E9T6' })

        await Maintenance.create([
            { ownerId: shalevOwner?._id, serviceName: 'Annual Service & Oil Change', date: 'Jan 2024', status: 'completed' },
            { ownerId: shalevOwner?._id, serviceName: 'Brake Inspection', date: 'Apr 2024', status: 'completed' },
            { ownerId: shalevOwner?._id, serviceName: 'Tire Rotation & Alignment', date: 'Oct 2027', status: 'upcoming' },
        ])

        await Maintenance.create([
            { ownerId: natalyOwner?._id, serviceName: 'Annual Service & Oil Change', date: 'Jan 2025', status: 'completed' },
            { ownerId: natalyOwner?._id, serviceName: 'Tire Rotation', date: 'Jul 2028', status: 'upcoming' },
        ])

        await Maintenance.create([
            { ownerId: henOwner?._id, serviceName: 'Full Vehicle Inspection', date: 'May 2026', status: 'completed' },
            { ownerId: henOwner?._id, serviceName: 'Air Filter Replacement', date: 'Nov 2029', status: 'upcoming' },
        ])

        await Maintenance.create([
            { ownerId: arielOwner?._id, serviceName: 'Annual Service & Oil Change', date: 'Apr 2026', status: 'completed' },
            { ownerId: arielOwner?._id, serviceName: 'Brake Fluid Change', date: 'Oct 2029', status: 'upcoming' },
        ])

        await Maintenance.create([
            { ownerId: liorOwner?._id, serviceName: 'Annual Service & Oil Change', date: 'Jun 2025', status: 'completed' },
            { ownerId: liorOwner?._id, serviceName: 'Full Vehicle Inspection', date: 'Dec 2028', status: 'upcoming' },
        ])



        console.log('Database seeded successfully!')
        console.log('Test owners:')
        console.log('  Shalev Lavi — VIN last 4: X4K9 (Umbrix)')
        console.log('  Nataly Demasov — VIN last 4: B3M7 (Orinex)')
        console.log('  Hen Naim — VIN last 4: C5P2 (Grenyx)')
        console.log('  Ariel Shushan — VIN last 4: D7R4 (Evion)')
        console.log('  Lior Levi — VIN last 4: E9T6 (Zaurus)')

        process.exit(0)
    } catch (error) {
        console.error('Seed error:', error)
        process.exit(1)
    }
}

seedDatabase()
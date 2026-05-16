import mongoose, { Schema, Document } from 'mongoose'

export interface ICar extends Document {
    carModel: string
    year: number
    color: string
    horsepower: number
    vin: string
    mileage: number
    lastService: string
    nextService: string
    carCollection: 'offroad' | 'luxury'
}

const CarSchema = new Schema<ICar>({
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    horsepower: { type: Number, required: true },
    vin: { type: String, required: true, unique: true },
    mileage: { type: Number, required: true, default: 0 },
    lastService: { type: String },
    nextService: { type: String },
    carCollection: { type: String, enum: ['offroad', 'luxury'], required: true },
}, { timestamps: true })

export default mongoose.model<ICar>('Car', CarSchema)
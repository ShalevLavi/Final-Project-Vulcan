import mongoose, { Schema, Document } from 'mongoose'

export interface ICar extends Document {
  carModel: string
  horsepower: number
  engineSize: string
  safetyLevel: number
  carCollection: 'offroad' | 'luxury'
  availableColors: string[]
  startingPrice: number
}

const CarSchema = new Schema<ICar>({
  carModel: { type: String, required: true },
  horsepower: { type: Number, required: true },
  engineSize: { type: String, required: true },
  safetyLevel: { type: Number, required: true, min: 1, max: 8 },
  carCollection: { type: String, enum: ['offroad', 'luxury'], required: true },
  availableColors: [{ type: String }],
  startingPrice: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model<ICar>('Car', CarSchema)
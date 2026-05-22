import mongoose, { Schema, Document } from 'mongoose'

export interface IOwner extends Document {
    ownerName: string
    vin: string
    carId: mongoose.Types.ObjectId
    year: number
    mileage: number
    lastService: string
    carColor: string
}

const OwnerSchema = new Schema<IOwner>({
    ownerName: { type: String, required: true },
    vin: { type: String, required: true, unique: true },
    carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true, default: 0 },
    lastService: { type: String },
    carColor: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model<IOwner>('Owner', OwnerSchema)
import mongoose, { Schema, Document } from 'mongoose'

export interface IOwner extends Document {
    ownerName: string
    vinLast4: string
    carId: mongoose.Types.ObjectId
    lastService: string
    nextService: string
    year: number
}

const OwnerSchema = new Schema<IOwner>({
    ownerName: { type: String, required: true },
    vinLast4: { type: String, required: true, minlength: 4, maxlength: 4 },
    carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    lastService: { type: String },
    nextService: { type: String },
    year: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model<IOwner>('Owner', OwnerSchema)
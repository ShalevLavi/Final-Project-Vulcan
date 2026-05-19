import mongoose, { Schema, Document } from 'mongoose'

export interface IMaintenance extends Document {
    ownerId: mongoose.Types.ObjectId
    serviceName: string
    date: string
    status: 'completed' | 'pending' | 'upcoming'
}

const MaintenanceSchema = new Schema<IMaintenance>({
    ownerId: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    serviceName: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['completed', 'upcoming', 'pending'], required: true },
}, { timestamps: true })

export default mongoose.model<IMaintenance>('Maintenance', MaintenanceSchema)
import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
    ownerId: mongoose.Types.ObjectId
    from: 'owner' | 'support'
    text: string
    createdAt: Date
}

const MessageSchema = new Schema<IMessage>({
    ownerId: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    from: { type: String, enum: ['owner', 'support'], required: true },
    text: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model<IMessage>('Message', MessageSchema)
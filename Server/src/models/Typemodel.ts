import mongoose, { Schema, Document } from "mongoose";


export interface IType extends Document {
    type: string,
    total_damage: number
}

const TypeSchema = new Schema<IType>({
    type: {
        type: String,
        unique: true,
        required: true
    },
    total_damage: {
        type: Number,
        required: true,
        default:0
    }
})

export default mongoose.model<IType>("Type", TypeSchema);

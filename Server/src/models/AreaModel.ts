import mongoose, { Schema, Document, Types } from "mongoose";

interface incidents {
    gname: string,
    total_incidents: number
    total_damage: number
}

const IncidentsSchema = new Schema<incidents>({
    gname: {
        type: String,
        required: true
    },
    total_incidents: {
        type: Number,
        required: true,
        default: 0
    },
    total_damage: {
        type: Number,
        required: true,
        default: 0
    }
})

export interface IArea extends Document {
    area: string,
    incidents: incidents[],
    total_incidents: number
    total_damage: number,
    avg:number,
    latitude: number,
    longitude: number,

}

const AreaSchema = new Schema<IArea>({
    area: {
        type: String,
        unique: true,
        required: true,
        default:"Unknown"
    },
    incidents: {
        type: [IncidentsSchema],
        default: []
    },
    total_incidents: {
        type: Number,
        required: true,
        default: 0
    },
    total_damage: {
        type: Number,
        required: true,
        default: 0
    },
    avg:{
        type: Number,
        required: true,
        default: 0
    },
    latitude: {
        type: Number,
        default: 0.0
    },
    longitude: {
        type: Number,
        default: 0.0
    }
})

export default mongoose.model<IArea>("Area", AreaSchema)
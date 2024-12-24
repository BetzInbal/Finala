import mongoose, { Schema, Document, Types } from "mongoose";

interface incidents {
    gname: string,
    total_incidents: number
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
    }
})


export interface IYearOrg extends Document {
    year: number,
    total_incidents: number,
    month: number[],
    arr_incidents: incidents[]
}

export const YearOrgSchema = new Schema<IYearOrg>({
    year: {
        type: Number,
        unique: true,
        required: true
    },
    total_incidents: {
        type: Number,
        required: true,
        default: 0
    },
    month: {

        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    arr_incidents: {
        type: [IncidentsSchema],
        default: []
    }

})
export default mongoose.model<IYearOrg>("YearOrg", YearOrgSchema);
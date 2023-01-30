import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const jobSchema = new Schema({
    job: {
        type: String,
        required: true,
        max: 70
    },
    priority: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("Job", jobSchema);
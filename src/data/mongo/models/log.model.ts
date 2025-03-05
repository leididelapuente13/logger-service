import {Schema, model} from 'mongoose';
import { LogType } from '../../../infrastructure/interfaces/Log.interface';

const logSchema = new Schema({
    service: {
        type: String,
        required: true
    },
    payload: {
        type: Object,
        required: false
    },
    type: {
        type: String,
        enum: LogType,
        required: true
    },
    content: {
        type: Object,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const LogModel = model('Logs', logSchema);
import {Schema, model} from 'mongoose';
import { CONSTANTS } from '../../../infrastructure/constants/constants';

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
        enum: CONSTANTS.LogTypes,
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

export const LogModel = model(CONSTANTS.DATABASE_MODELS.Logs, logSchema);
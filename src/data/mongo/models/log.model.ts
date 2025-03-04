import {Schema, model} from 'mongoose';
import { LogType } from '../../../domain/entities/log.entity';

const logSchema = new Schema({
    service: {
        type: String,
        required: true
    },
    payload: {
        type: String,
        required: false
    },
    type: {
        type: String,
        enum: LogType,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const LogModel = model('Todo', logSchema);
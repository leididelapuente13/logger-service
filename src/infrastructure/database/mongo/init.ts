import * as mongoose from 'mongoose';
import { IDatabase, ConnectionOptions } from '../../interfaces/IDatabase';

export class MongoDatabase implements IDatabase {
    async connect(options: ConnectionOptions): Promise<void> {
        const {mongo_uri, database} = options;

        try {
            await mongoose.connect(mongo_uri, {dbName: database});
            console.log('Connected to MongoDB');
        }catch (error) {
            console.error('Error connecting to MongoDB', error);
            throw error;
        }
    }
}
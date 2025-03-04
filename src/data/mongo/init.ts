import * as mongoose from 'mongoose';

interface ConnectionOptions {
    mongo_uri: string;
    database: string;
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions): Promise<void> {
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
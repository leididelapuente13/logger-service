export interface ConnectionOptions {
    mongo_uri: string;
    database: string;
}

export interface IDatabase {
    connect(options: ConnectionOptions): Promise<void>;
}
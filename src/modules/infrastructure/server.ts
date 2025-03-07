import express, { Router } from 'express';
import cors from 'cors'

interface options {
    port: number,
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes
    }

    async start() {

        // this.app.use(cors());

        this.app.use(express.json())

        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Port listening on ${this.port} in http://localhost:${this.port}`)
        })
    }
}
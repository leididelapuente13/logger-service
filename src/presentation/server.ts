import express, { Router } from 'express';
import { expressLogger } from '../infrastructure/middleware/logger.middleware';

interface options {
    port: number,
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port   : number;
    private readonly routes : Router;

    constructor (options: options){
        const {port, routes} = options;
        this.port = port;
        this.routes = routes
    }

    async start(){

        this.app.use(express.json())

        this.app.use(this.routes)
        this.app.use(expressLogger())

        this.app.listen(this.port, ()=>{
            console.log(`Port listening on ${this.port} in http://localhost:${this.port}`)
        })
    }
}
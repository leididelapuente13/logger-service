export namespace CONSTANTS {

    export enum DATABASE_MODELS{
        Logs = 'Logs',
    }

    export enum LogTypes {
        POST    = 'post',
        GET     = 'get',
        PUT     = 'put',
        PATCH   = 'patch',
        DELETE  = 'delete',
        ERROR   = 'error',
        TRACE   = 'trace',
    }   
}
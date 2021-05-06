import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { Connection } from 'typeorm';

export type Context = {
    req: Request & {
        session: Session & Partial <SessionData> & {
            userId: number
        } }
    res: Response
    redis: Redis
    connection: Connection
}

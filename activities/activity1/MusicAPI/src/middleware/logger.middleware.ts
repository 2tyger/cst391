import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const getProcessingTimeInMS = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

/*
 * add logs for an API endpoint using the following pattern:
    * [id] [timestamp] method:url START processing
    * [id] [timestamp] method:url statusCode END processing
    * 
    * @param req - the request object
    * @param res - the response object
    * @param next - the next middleware function in the stack
 */
export default function logger(req: Request, res: Response, next: NextFunction) {
    // generate unique identifier
    const id = uuidv4();

    // get timestamp
    const now = new Date();
    const timestamp = [now.getFullYear(), '-', now.getMonth() + 1, '-', now.getDate(), ' ', now.getHours(), ':', now.getMinutes(), ':', now.getSeconds()]
        .join(' ');

    // get api endpoint
    const { method, url } = req;

    // log start of the excecution process
    const start = process.hrtime();
    const startText = `START:${getProcessingTimeInMS(start)}`;
    const idText = `[${id}]`;
    const timestampText = `[${timestamp}]`;

    // log start of execution process
    console.log(`${idText}${timestampText} ${method}:${url} ${startText}`);

    // listen for the 'finish' event on the response object, which indicates that the response has been sent
    res.once('finish', () => {
        // log end of execution process
        const end = process.hrtime(start);
        const endText = `END:${getProcessingTimeInMS(end)}`;
        console.log(`${idText}${timestampText} ${method}:${url} ${res.statusCode} ${endText}`);
    });

    // execute next middleware/event handler
    next();
};


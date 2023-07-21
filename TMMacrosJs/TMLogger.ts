// @ts-ignore
import fs from 'fs';
import * as path from 'path';

export const logFilePath = `${path.dirname(__filename)}/TMLog.log`;

export function toLogStr(x: any | null) {
    const str = x.toString()

    const regex = /function\s+(\w+)\s*\(/
    const match = regex.exec(str)

    if (match && match[1]) {
        return match[1]
    } else {
        return str
    }
}

function internalLog(msg: any | null, e: Error | null = null) {
    console.log(msg)
    let logMessage;
    if (e == null) {
        logMessage = `[${new Date().toISOString()}] ${msg}\n`;
    } else {
        logMessage = `[${new Date().toISOString()}] ${msg}:${e.stack}\n`;
    }

    try {
        fs.writeFileSync(logFilePath, logMessage, {flag: 'a'});
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
}

export enum LogLevel {
    INFO,
    DEBUG,
    VERBOSE,
    FLOODING
}

export class Log {
    static logLevel = LogLevel.DEBUG

    static i(msg: any | null, e: Error | null = null) {
        if (Log.logLevel >= LogLevel.INFO)
            internalLog(msg, e)
    }

    static d(msg: any | null, e: Error | null = null) {
        if (Log.logLevel >= LogLevel.DEBUG)
            internalLog(msg, e)
    }

    static v(msg: any | null, e: Error | null = null) {
        if (Log.logLevel >= LogLevel.VERBOSE)
            internalLog(msg, e)
    }

    static f(msg: any | null, e: Error | null = null) {
        if (Log.logLevel >= LogLevel.FLOODING)
            internalLog(msg, e)
    }
}

/**
 * Meant to be temporarily during debugging.
 * Can also be used very sparingly.
 */
export function logz(msg: any | null, e: Error | null = null) {
    internalLog(msg, e)
}

function init() {
    deleteFile(logFilePath);
}

function deleteFile(filePath: string) {
    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                //console.log('No need to delete because file already does not exist.');
            } else {
                console.error('Error deleting file:', err);
            }
        } else {
            //console.log('File deleted successfully.');
        }
    });
}

init();

import {Log} from "./TMLogger";
import { exec } from 'child_process';
import OSType, { osType } from './OSType';
import fs from "fs";

function fileExists(filePath: string): boolean {
    try {
        // Check if the file exists by attempting to access its stats
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

export function open2(filePath: string): void {
    if (!fileExists(filePath))
        throw Error(`File does not exist:${filePath}`)

    let command: string;

    switch (osType) {
        case OSType.Mac: // macOS
            command = `open ${filePath}`;
            break;
        case OSType.Windows: // Windows
            command = `start "" "${filePath}"`;
            break;
        case OSType.Linux: // Linux
            command = `xdg-open ${filePath}`;
            break;
        default:
            throw new Error(`Unsupported platform: ${osType}`);
    }

    exec(command, (error) => {
        if (error) {
            console.error(`Error opening file: ${error.message}`);
        }
    });
}
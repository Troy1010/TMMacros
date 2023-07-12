import {Log} from "./TMLogger";
import { exec } from 'child_process';
import OSType, { osType } from './OSType';
import {TODO} from "./TODO";

export function MsgBox(s: string): void {
    if (osType == OSType.Windows) {
        const command = `PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('${s}')"`
        exec(command, (error, stdout, stderr) => {
            if (error) {
                Log.d(`Error executing command: ${error.message}`);
                return;
            }
            Log.d(`Command output:\n${stdout}`);
        });
    } else {
        TODO()
    }
}
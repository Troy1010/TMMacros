import {exec} from "child_process";
import OSType, {osType} from "./OSType";
import {TODO} from "./TODO";
import {Log, logz} from "./TMLogger";

export default class ExecWrapper {
    static kill(processId: Number) {
        logz("killing..")
        if (osType == OSType.Windows)
            exec(`taskkill /F /PID ${processId}`, (error, stdout, stderr) => {
                Log.d(`kill result. processId:${processId} error:${error?.stack} stdout:${stdout}, stderr:${stderr}`)
            });
        else
            TODO()
    }
}

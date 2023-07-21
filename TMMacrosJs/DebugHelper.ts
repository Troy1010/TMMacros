import {Window, windowManager} from 'node-window-manager';
import {Log, logFilePath, logz} from "./TMLogger";
// @ts-ignore
import ffi from 'ffi-napi';
import WindowUtil from "./WindowUtil";
import {open2} from "./open2";

export default class DebugHelper {
    static openLog() {
        try {
            open2(logFilePath)
        } catch (e) {
            logz("failed because", e as Error)
        }
    }
}

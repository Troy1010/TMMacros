import {Window, windowManager} from 'node-window-manager';
// @ts-ignore
import ffi from 'ffi-napi';
import "./let";
import {IRectangle} from "node-window-manager/dist/interfaces";
import {Log, logz} from "./TMLogger";
import {getScreenSectionType, ScreenSection} from "./ScreenSection";
import {sleep} from "./Misc";

export default class WindowUtil {
    // const screenSection = ScreenSection.fromRectangle(window.getBounds());
    static isTaken(screenSection: ScreenSection): boolean {
        return windowManager.getWindows()
            .filter(x => x.isVisible())
            .some((window, index, array) => {
                return screenSection == getScreenSectionType(ScreenSection.fromRectangle(window.getBounds()))
            })
    }

    static takenScreenSections(): ScreenSection[] {
        return windowManager.getWindows()
            .filter(x => x.isVisible())
            .map(x => ScreenSection.fromRectangle(x.getBounds()))
            .filter(x => getScreenSectionType(x) != null)
    }

    static setBounds2(window: Window, bounds: IRectangle) {
        if (this.isDesktop(window)) {
            Log.d("setBounds2 detected Desktop. Ignoring command")
        } else {
            window.setBounds(bounds)
        }
    }

    static relaxedEquals(window: Window, ...strings: string[]): boolean {
        if (this.isDesktop(window))
            return false
        const lowerCaseStrings = strings.map((s) => s.toLowerCase());
        return lowerCaseStrings.some((s) =>
            // @ts-ignore
            (window.path != undefined && window.path.toLowerCase().includes(s))
            // @ts-ignore
            || window.getTitle().toLowerCase().includes(s)
        );
    }

    static toLogStr(window: Window | null) {
        try {
            if (window == null)
                return "null"
            else
                return `{ title:${window.getTitle()}, path:${window.path}, bounds:${window.getBounds().letZ(it => [it.x, it.y, it.width, it.height])}, isVisible:${window.isVisible()} ownerPath:${window.getOwner().path}, ownerTitle:${window.getOwner().getTitle()} }`
        } catch {
            if (window == null)
                return "null"
            else
                return `{ title:${window.getTitle()}, path:${window.path}, bounds:${window.getBounds().letZ(it => [it.x, it.y, it.width, it.height])}, isVisible:${window.isVisible()} }`
        }
    }

    // TODO: This could be reused in WaitForWindow, etc.
    // Deprecated. Just use: windowManager.getWindows().find(x => WindowUtil.relaxedEquals(x, ...strings)) || null
    static findWindow(...strings: string[]): Window | null {
        return windowManager.getWindows().find(x => WindowUtil.relaxedEquals(x, ...strings)) || null;
    }

    static waitForActiveWindow(...strings: string[]) {
        while (true) {
            const windowZ = windowManager.getActiveWindow()
            if (WindowUtil.relaxedEquals(windowZ, ...strings))
                return windowZ
            else
                Log.v(`non match. strings:${strings} windowZ:${this.toLogStr(windowZ)}`)
            sleep(500)
        }
    }

    static waitForWindow(...strings: string[]): Window {
        while (true) {
            let foundWindow: Window | null = windowManager.getWindows().find(x => WindowUtil.relaxedEquals(x, ...strings)) || null
            if (foundWindow != null)
                return foundWindow
            sleep(500)
        }
    }

    static waitForNoWindow(...strings: string[]) {
        while (true) {
            let foundWindow: Window | null = windowManager.getWindows().find(x => WindowUtil.relaxedEquals(x, ...strings)) || null
            if (foundWindow == null)
                return
            sleep(500)
        }
    }

    static waitForNotActive(window: Window): [Window, Window] {
        while (true) {
            const windowZ = windowManager.getActiveWindow()
            if (window.id != windowZ.id)
                return [window, windowZ]
            sleep(500)
        }
    }

    /**
     * I could not find a more reliable way.
     */
    static isDesktop(window: Window) {
        return window.getTitle() == "" && window.path == "C:\\Windows\\explorer.exe"
    }
}

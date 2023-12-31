import {Window, windowManager} from "node-window-manager";
import {ScreenSection, ScreenSectionType} from "./ScreenSection";
import {exec} from 'child_process';
import {Log, logz} from "./TMLogger";
import WindowUtil from "./WindowUtil";
import OSType, {osType} from "./OSType";
import {TODO} from "./TODO";
import ListUtil from "./ListUtil";
import util from 'util';
import {IRectangle} from "node-window-manager/dist/interfaces";

const promisifiedExec = util.promisify(exec);

export function trimIndent(s: string) {
    // Split the string into lines
    const lines = s.split('\n');

    // Find the common leading whitespace (indentation)
    // @ts-ignore
    const commonIndent = lines.reduce((indent, line) => {
        if (line.trim() !== '') {
            // @ts-ignore
            const lineIndent = line.match(/^\s*/)[0].length;
            return (indent === null || lineIndent < indent) ? lineIndent : indent;
        }
        return indent;
    }, null);

    // Remove the common leading whitespace from each line
    // @ts-ignore
    return lines.map(line => line.slice(commonIndent)).join('\n');
}

export function RectangleWithXY(rectangle: IRectangle, x: number, y: number) :IRectangle {
    return {x: x, y: y, width: rectangle.width, height: rectangle.height}
}

// export function launchFolder(s: string) {
//     `explorer "${folderPath}"`
//
//     exec(command, (error) => {
//         if (error) {
//             console.error(`Failed to open folder: ${error}`);
//         }
//     });
// }

export function isProcessRunning(s: string): Promise<boolean> {
    let command:string;
    if (osType == OSType.Windows) {
        command = 'tasklist'
    } else {
        command = 'ps -A'
    }
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error('Error checking for processes:', error.message);
            reject(error);
            return;
          }
          if (stdout.toLowerCase().includes(s.toLowerCase())) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
}


export function quit(s: string) {
    if (osType == OSType.Windows) {
        exec(`taskkill /F /IM ${s}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            Log.d(`Command output:\n${stdout}`);
        });
    } else {
        const script = `
          tell application "${s}"
            quit
          end tell
        `;
        exec(`osascript -e '${script}'`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            Log.d(`Command output:\n${stdout}`);
        });
    }
}

export function activeWindowScreenSection(): ScreenSection | null {
    const activeWindowScreenSection = ScreenSection.fromRectangle(windowManager.getActiveWindow().getBounds());
    Log.d(`activeWindowScreenSection:${activeWindowScreenSection}`)
    for (const key in ScreenSectionType) {
        if (ScreenSectionType.hasOwnProperty(key)) {
            const screenSection = ScreenSectionType[key];
            Log.d(`${key}:${screenSection}`);
            if (screenSection.equals2(activeWindowScreenSection)) {
                Log.d(`found match. Returning:${key}`)
                return screenSection;
            }
        }
    }
    return null;
}

// DEPRECATED: Use WindowUtil.waitForActiveWindow() instead.
export function waitForActiveWindow(...strings: string[]) {
    while (true) {
        const windowZ = windowManager.getActiveWindow()
        if (WindowUtil.relaxedEquals(windowZ, ...strings))
            return windowZ
        sleep(500)
    }
}

export function waitForWindow(...strings: string[]) {
    while (true) {
        let window = findWindow(...strings)
        if (window != null)
            return window
        sleep(500)
    }
}

export function waitForMainGitKrakenWindow() {
    let counter = 0
    let truthCounter = 0
    while (true) {
        const windows =
            windowManager.getWindows()
                .filter(it => WindowUtil.relaxedEquals(it, "gitkraken"))

        const filteredProcessIDs =
            windows
                .filter(it => it.getTitle() == "Default IME")
                .map(it => it.processId)

        if (!ListUtil.hasDuplicate(filteredProcessIDs) && (windows.length > 0)) {
            truthCounter = truthCounter + 1
        } else {
            truthCounter = 0
        }

        if (truthCounter > 6) {
            const window = windows.find(it => it.getTitle().includes("GitKraken"))
            if (window != null)
                return window
        }

        sleep(200)
        if (counter > 40)
            throw Error("Timeout")
        counter = counter + 1
    }
}

export function findWindow(...strings: string[]): Window | null {
    const matchByTitle = windowManager.getWindows().find((window) => strings.some(it => window.getTitle().includes(it))) || null
    if (matchByTitle)
        return matchByTitle
    return windowManager.getWindows().find((it) => WindowUtil.relaxedEquals(it, ...strings)) || null;
}


export function openFolderOrFile(folderPath: string) {
    Log.d(`openFolderOrFile. folderPath:${folderPath}`)
    if (osType == OSType.Windows)
        exec(`start "" "${folderPath}"`, (error) => {
            if (error) {
                console.error('Error opening folder:', error);
            } else {
                Log.d('Folder opened successfully.');
            }
        })
    else
        exec(`open "${folderPath}"`, (error) => {
            if (error) {
                Log.d('Error opening folder:', error);
                console.error('Error opening folder:', error);
            } else {
                Log.d('Folder opened successfully.');
            }
        })
}

/**
 * This version is async.
 */
export async function openFolderOrFile2(folderPath: string) {
    Log.d(`openFolderOrFile2. folderPath:${folderPath}`);
    try {
        if (osType == OSType.Windows) {
            await promisifiedExec(`start "" "${folderPath}"`);
        } else {
            await promisifiedExec(`open "${folderPath}"`);
        }
        Log.d('Folder opened successfully.');
    } catch (error: any) {
        Log.d('Error opening folder:', error);
        console.error('Error opening folder:', error);
    }
}

export function sleep(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Do nothing and wait until the specified time has passed
    }
}
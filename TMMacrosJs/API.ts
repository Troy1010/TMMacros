import * as Misc from './Misc';
import {openFolderOrFile, sleep, waitForActiveWindow} from './Misc';
import {ScreenSectionType} from "./ScreenSection";
import OSType, {osType} from './OSType';
import {Log, logz} from "./TMLogger";
import {windowManager} from "node-window-manager";
import WindowUtil from "./WindowUtil";
import {TODO} from "./TODO";
import {exec} from "child_process";
import {config} from "./Config";
import "./also"
import {logExecutionTime} from "./logExecutionTime";
import {logMethodName} from "./logMethodName";
import {open2} from "./open2";
import DebugHelper from "./DebugHelper";
import ExecWrapper from "./ExecWrapper";
import path from 'path';
import {MsgBox} from "./MsgBox";

export class API {
    @logMethodName
    @logExecutionTime
    static playground() {
        logz(`activeWindow:${WindowUtil.toLogStr(windowManager.getActiveWindow())}`)
        DebugHelper.openLog()
    }


    @logMethodName
    @logExecutionTime
    static openWorkBacklog() {
        (async () => {
            // # Handle if there is already an open Obsidian window.
            if (await Misc.isProcessRunning("Obsidian")) {
                const foundWindow = windowManager.getWindows().find(x => WindowUtil.relaxedEquals(x, "Obsidian")) || null
                if (foundWindow != null && osType == OSType.Mac) { // I am not sure how to detect if a window exists in another desktop on Windows.. Only mac will return null if the window exists in another desktop.
                    Log.d(`Moving Obsidian window to front bc Obsidian was running and its window was found. window:${foundWindow}`)
                    foundWindow.bringToTop()
                } else {
                    Log.d("Quitting isObsidianRunning bc Obsidian was running and its window could not be found.")
                    Misc.quit("Obsidian")
                    sleep(2000) // TODO: race condition
                }
            } else {
                Log.d("Obsidian was not running. Moving forward.")
            }
            // # Open Obsidian at BACKLOG
            let command: string;
            if (osType == OSType.Windows) {
                command = "start obsidian://open?vault=ObsidianVault_TroyGM&file=BACKLOG"
            } else {
                command = 'open "obsidian://open?vault=ObsidianVault_TroyGM&file=BACKLOG"'
            }
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    Log.d(`Error executing command: ${error.message}`);
                    return;
                }
                Log.d(`Command output:\n${stdout}`);
            });
            // # Reposition
            WindowUtil.waitForActiveWindow("Obsidian")
                .also(x => Log.d(`About to move ActiveWindow:${WindowUtil.toLogStr(x)}`))
                .setBounds(ScreenSectionType.big_right_three.toRectangle())
        })();
    }


    @logMethodName
    @logExecutionTime
    static openWorkThoughtStream() {
        (async () => {
            // # Handle if there is already an open Obsidian window.
            if (await Misc.isProcessRunning("Obsidian")) {
                const foundWindow = windowManager.getWindows().find(x => WindowUtil.relaxedEquals(x, "Obsidian")) || null
                if (foundWindow != null && osType == OSType.Mac) { // I am not sure how to detect if a window exists in another desktop on Windows.. Only mac will return null if the window exists in another desktop.
                    Log.d(`Moving Obsidian window to front bc Obsidian was running and its window was found. window:${foundWindow}`)
                    foundWindow.bringToTop()
                } else {
                    Log.d("Quitting isObsidianRunning bc Obsidian was running and its window could not be found.")
                    Misc.quit("Obsidian")
                    sleep(2000) // TODO: race condition
                }
            } else {
                Log.d("Obsidian was not running. Moving forward.")
            }
            // # Open Obsidian at WorkThoughtStream
            let command: string;
            if (osType == OSType.Windows) {
                command = "start obsidian://open?vault=ObsidianVault_TroyGM&file=ThoughtStream"
            } else {
                command = 'open "obsidian://open?vault=ObsidianVault_TroyGM&file=ThoughtStream"'
            }
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    Log.d(`Error executing command: ${error.message}`);
                    return;
                }
                Log.d(`Command output:\n${stdout}`);
            });
            // # Reposition
            WindowUtil.waitForActiveWindow("Obsidian")
                .also(x => Log.d(`About to move ActiveWindow:${WindowUtil.toLogStr(x)}`))
                .setBounds(ScreenSectionType.big_right_three.toRectangle())
        })();
    }


    @logMethodName
    @logExecutionTime
    static bossThenOblivion() {
        open2(config().bossFile, false)
        WindowUtil.waitForWindow("Boss")
            .bringToTop()
        WindowUtil.waitForNoWindow("Boss")
        sleep(2000)
        open2(config().oblivionFile, false)
    }


    @logMethodName
    @logExecutionTime
    static openDefaultFolder() {
        Misc.openFolderOrFile(config().developGenericFolder)
        Misc.waitForActiveWindow("Explorer", "Finder")
            .also (x => sleep(50)) // Without this sleep, the window does not react to .setBounds(), but I'm not sure why.
            .setBounds(ScreenSectionType.bot_left.toRectangle())
    }


    @logMethodName
    @logExecutionTime
    static launchObsidian() {
        // If there is an old Obsidian window, kill it. This is a duct-tape solution bc I don't know how to move windows between desktops.
        Misc.findWindow("Obsidian")
            ?.also(x => Log.d(`Obsidian window:${WindowUtil.toLogStr(x)}`))
            ?.also(x => ExecWrapper.kill(x.processId))
            ?.also(x => sleep(2000))
        //
        if (osType == OSType.Windows) {
            const command = "start obsidian://open/?vault=Troy1010"
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
        Misc.waitForActiveWindow("Obsidian")
            .also(x => x.setBounds(ScreenSectionType.big_right_three.toRectangle()))
            // .also(x => WindowUtil.waitForNotActive(x))
            // .also(x => ExecWrapper.kill(x.processId))
    }

    @logMethodName
    @logExecutionTime
    static developGeneric() {
        // # GitKraken
        openFolderOrFile(config().gitKrakenDir)
        // sleep(8000) // TODO: Resolve race condition.
        // Misc.findWindow("GitKraken")
        //     ?.also(x => Log.d(`gitkrakenWindow:${WindowUtil.logStr(x)}`))
        //     ?.also(x => x?.bringToTop())
        //     ?.also(x => x?.setBounds(ScreenSectionType.big_right_two.toRectangle()))
        // # Folder
        Misc.openFolderOrFile(config().developGenericFolder)
        Misc.waitForActiveWindow("Explorer")
            .setBounds(ScreenSectionType.bot_left.toRectangle())
    }

    @logMethodName
    @logExecutionTime
    static openGitClient() {
        Misc.findWindow("GitKraken")
            ?.also(x => Log.d(`gitkrakenWindow:${WindowUtil.toLogStr(x)}`))
            ?.also(x => ExecWrapper.kill(x.processId))
            ?.also(x => sleep(2000))
        openFolderOrFile(config().gitKrakenDir)
    }

    @logMethodName
    @logExecutionTime
    static autoMove() {
        const window = windowManager.getActiveWindow()
        if (WindowUtil.isDesktop(window)) {
            Log.d("autoMove detected Desktop. Ignoring command.")
        } else if (WindowUtil.relaxedEquals(window, "explorer.exe", "Finder")) {
            const cur_screen_section = Misc.activeWindowScreenSection();
            if (cur_screen_section === ScreenSectionType.bot_left) {
                window.setBounds(ScreenSectionType.top_left.toRectangle())
            } else {
                window.setBounds(ScreenSectionType.bot_left.toRectangle())
            }
        } else if (WindowUtil.relaxedEquals(window, "GitKraken")) {
            window.setBounds(ScreenSectionType.big_right_two.toRectangle())
        } else if (WindowUtil.relaxedEquals(window, "idea64.exe")) {
            const cur_screen_section = Misc.activeWindowScreenSection();
            if (cur_screen_section === ScreenSectionType.big_right) {
                window.setBounds(ScreenSectionType.big_right_three.toRectangle())
            } else if (cur_screen_section === ScreenSectionType.big_right_three) {
                window.setBounds(ScreenSectionType.big_right_four.toRectangle())
            } else if (cur_screen_section === ScreenSectionType.big_right_four) {
                window.setBounds(ScreenSectionType.big_right_five.toRectangle())
            } else {
                window.setBounds(ScreenSectionType.big_right.toRectangle())
            }
        } else if (WindowUtil.relaxedEquals(window, "cmd.exe", "Command Prompt", "Terminal")) {
            window.setBounds(ScreenSectionType.top_left.toRectangle())
        } else if (WindowUtil.relaxedEquals(window, "Obsidian")) {
            const cur_screen_section = Misc.activeWindowScreenSection();
            if (cur_screen_section === ScreenSectionType.big_right_three) {
                window.setBounds(ScreenSectionType.small_left.toRectangle())
            } else {
                window.setBounds(ScreenSectionType.big_right_three.toRectangle())
            }
        } else {
            const cur_screen_section = Misc.activeWindowScreenSection();
            if (cur_screen_section === ScreenSectionType.big_right) {
                window.setBounds(ScreenSectionType.big_right_two.toRectangle())
            } else if (cur_screen_section === ScreenSectionType.big_right_two) {
                window.setBounds(ScreenSectionType.big_right_three.toRectangle())
            } else if (cur_screen_section === ScreenSectionType.big_right_three) {
                window.setBounds(ScreenSectionType.big_right_four.toRectangle())
            } else if (cur_screen_section === ScreenSectionType.big_right_four) {
                window.setBounds(ScreenSectionType.big_right_five.toRectangle())
            } else {
                window.setBounds(ScreenSectionType.big_right.toRectangle())
            }
        }
    }
}
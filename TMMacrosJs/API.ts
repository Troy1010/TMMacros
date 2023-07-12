import * as Misc from './Misc';
import {openFolderOrFile, sleep} from './Misc';
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

export class API {
    @logMethodName
    @logExecutionTime
    static playground() {
        logz("Hello")

        logz(`config():${config()}`)

        API.openGitClient()

        DebugHelper.openLog()

        // windowManager.getActiveWindow().setBounds(ScreenSectionType.big_right.toRectangle())

        // logz(`ScreenSectionType.big_right_two:${ScreenSectionType.big_right_two}`)
        // logz(`isTaken:${WindowUtil.isTaken(ScreenSectionType.big_right_two)}`)
        // logz(`takenScreenSections:${WindowUtil.takenScreenSections()}`)

        //open2(`C:\\TMLocal\\Coding\\AllLanguages\\TMMacros\\TMMacrosJs\\TMLog.log`)

        // logz(`windows:${windowManager.getWindows().filter(x => x.isVisible()).map(x => WindowUtil.logStr(x)).join("\n")}`)



        // DebugHelper.logActiveWindow()

        // const screenSections =
        //     windowManager.getWindows()
        //         .map((it: Window) => ScreenSection.fromRectangle(it.getBounds()))

        // const window = windowManager.getActiveWindow()
        // const cur_screen_section = Misc.activeWindowScreenSection();
        // if (screenSections.includes([ScreenSectionType.big_right, ScreenSectionType.big_right_two, ScreenSectionType.big_right_two])) {

        // } else if (screenSections.includes(ScreenSectionType.big_right)) {
        //     window.setBounds(ScreenSectionType.big_right_two.toRectangle())
        // } else if (cur_screen_section === ScreenSectionType.big_right_two) {
        //     window.setBounds(ScreenSectionType.big_right_three.toRectangle())
        // } else if (cur_screen_section === ScreenSectionType.big_right_three) {
        //     window.setBounds(ScreenSectionType.big_right_four.toRectangle())
        // } else if (cur_screen_section === ScreenSectionType.big_right_four) {
        //     window.setBounds(ScreenSectionType.big_right_five.toRectangle())
        // } else {
        //     window.setBounds(ScreenSectionType.big_right.toRectangle())
        // }

        // let counter = 0;
        // const intervalId = setInterval(() => {
        //     counter++;
        //     logz(`counter:${counter}`)

        //     const windows =
        //         windowManager.getWindows()
        //             .filter((it: any) => WindowUtil.relaxedEquals(it, "gitkraken"))

        //     const filteredProcessIDs =
        //         windows
        //             .filter((it: any) => it.getTitle() == "Default IME")
        //             .map((it: any) => it.processId)


        //     const returning =
        //         !ListUtil.hasDuplicate(filteredProcessIDs) && (windows.length > 0)
        //     logz(`returning:${returning}`)


        //     windowManager.getWindows()
        //         .filter((it: any) => WindowUtil.relaxedEquals(it, "gitkraken"))
        //         .forEach((it: any) => logz(`path:${it.path} title:${it.getTitle()} q:${it.getOwner().getTitle()} w:${JSON.stringify(it.getBounds()).replace("\n", "")} h:${JSON.stringify(it).replace("\n", "")}`))

        //     if (counter >= 1) {
        //         clearInterval(intervalId);
        //     }
        // }, 2000);
    }


    @logMethodName
    @logExecutionTime
    static launchObsidian() {
        // If there is an old Obsidian window, kill it. This is a duct-tape solution bc I don't know how to move windows between desktops.
        Misc.findWindow("Obsidian")
            ?.also(x => Log.d(`Obsidian window:${WindowUtil.logStr(x)}`))
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
            ?.also(x => Log.d(`gitkrakenWindow:${WindowUtil.logStr(x)}`))
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
        } else if (WindowUtil.relaxedEquals(window, "explorer.exe")) {
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
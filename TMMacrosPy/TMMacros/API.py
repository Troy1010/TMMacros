from ._Logger import logz

import pygetwindow as gw
from . import subprocess_wrapper
from . import sys_wrapper
from . import ScreenSection
from . import Misc
import pygetwindow
import TM_CommonPy as TM  # noqa
import subprocess
from .get_active_explorer_window_dir import get_active_explorer_window_dir
from . import TMCommonAppleScript_wrapper
from . import pyautogui_wrapper
import time
from . import launch_obsidian
from . import launch_gitkraken
from . import config
from . import launch_folder


def playground():
    logz("playground")
    Misc.active_window_move(ScreenSection.Type.bot_left.value)


def setup_tmmacros():
    logz("setup_tmmacros")
    # Obsidian
    Misc.quit2("Obsidian.exe")
    launch_obsidian.launch_obsidian()
    Misc.wait_for_active_window("Obsidian")
    Misc.active_window_move(ScreenSection.Type.big_right_three.value)
    # GitKraken
    time.sleep(0.5)
    Misc.quit2("GitKraken.exe")
    launch_gitkraken.launch_gitkraken()
    Misc.bring_window_to_front("GitKraken")
    Misc.wait_for_active_window("GitKraken")
    Misc.active_window_move(ScreenSection.Type.big_right_two.value)
    #
    time.sleep(5)
    launch_folder.launch_folder_tmmacros()
    time.sleep(2)
    logz("Moving")
    logz(f"active_window_exe:{Misc.active_window_exe()}")
    #Misc.wait_for_active_window_explorer()
    Misc.active_window_move(ScreenSection.Type.bot_left.value)


def setup_mutagen_plus():
    logz("setup_mutagen_plus")
    # Obsidian
    Misc.quit2("Obsidian.exe")
    launch_obsidian.launch_obsidian_at_w_justin_todo()
    Misc.wait_for_active_window("Obsidian")
    Misc.active_window_move(ScreenSection.Type.big_right_three.value)
    # GitKraken
    time.sleep(0.5)
    Misc.quit2("GitKraken.exe")
    launch_gitkraken.launch_gitkraken_at_w_justin()
    Misc.bring_window_to_front("GitKraken")
    Misc.wait_for_active_window("GitKraken")
    Misc.active_window_move(ScreenSection.Type.big_right_two.value)


def open_obsidian():
    logz("open_obsidian")
    launch_obsidian.launch_obsidian()
    Misc.wait_for_active_window("Obsidian")
    Misc.active_window_move(ScreenSection.Type.big_right_three.value)


def open_terminal():
    logz("openTerminal")
    if Misc.is_active_window("cmd.exe", "Command Prompt", "Terminal"):
        if sys_wrapper.is_windows():
            active_terminal_window = pygetwindow.getActiveWindow()
            logz(f"active_terminal_window:{active_terminal_window}")
            active_terminal_window.activate()
            active_terminal_window.restore()
        else:
            subprocess_wrapper.launchTerminal(None)
    else:
        directory = get_active_explorer_window_dir()
        logz(f"directory:{directory}")
        subprocess_wrapper.launchTerminal(directory)
    Misc.wait_for_active_window("cmd.exe", "Command Prompt", "Terminal")
    Misc.active_window_move(ScreenSection.Type.top_left.value)


def auto_move():
    logz("autoReposition")
    if Misc.is_active_window_explorer():
        cur_screen_section = Misc.active_window_screen_section()
        if cur_screen_section == ScreenSection.Type.bot_left.value:
            Misc.active_window_move(ScreenSection.Type.top_left.value)
        else:
            Misc.active_window_move(ScreenSection.Type.bot_left.value)
    elif Misc.is_active_window("GitKraken"):
        Misc.active_window_move(ScreenSection.Type.big_right_two.value)
    elif Misc.is_active_window_jetbrains():
        cur_screen_section = Misc.active_window_screen_section()
        if cur_screen_section == ScreenSection.Type.big_right.value:
            Misc.active_window_move(ScreenSection.Type.big_right_three.value)
        elif cur_screen_section == ScreenSection.Type.big_right_three.value:
            Misc.active_window_move(ScreenSection.Type.big_right_four.value)
        elif cur_screen_section == ScreenSection.Type.big_right_four.value:
            Misc.active_window_move(ScreenSection.Type.big_right_five.value)
        else:
            Misc.active_window_move(ScreenSection.Type.big_right.value)
    elif Misc.is_active_window("cmd.exe", "Command Prompt", "Terminal"):
        Misc.active_window_move(ScreenSection.Type.top_left.value)
    else:
        cur_screen_section = Misc.active_window_screen_section()
        if cur_screen_section == ScreenSection.Type.big_right.value:
            Misc.active_window_move(ScreenSection.Type.big_right_two.value)
        elif cur_screen_section == ScreenSection.Type.big_right_two.value:
            Misc.active_window_move(ScreenSection.Type.big_right_three.value)
        elif cur_screen_section == ScreenSection.Type.big_right_three.value:
            Misc.active_window_move(ScreenSection.Type.big_right_four.value)
        elif cur_screen_section == ScreenSection.Type.big_right_four.value:
            Misc.active_window_move(ScreenSection.Type.big_right_five.value)
        else:
            Misc.active_window_move(ScreenSection.Type.big_right.value)


def moveAndResizeBigRight():
    logz("moveAndResizeBigRight")
    Misc.active_window_move(ScreenSection.Type.big_right.value)

import pygetwindow as gw
import time
import subprocess
import psutil

from .ScreenSection import ScreenSection
from . import ScreenSection
from ._Logger import logz  # noqa
import time
from . import TMCommonAppleScript_wrapper
from . import sys_wrapper

if sys_wrapper.is_windows():
    import win32gui
    import win32process


def active_window_exe():
    if sys_wrapper.is_windows():
        # Get the handle of the active window
        active_window_handle = win32gui.GetForegroundWindow()

        # Get the process ID associated with the active window
        _, process_id = win32process.GetWindowThreadProcessId(active_window_handle)

        # Get the process object using the process ID
        process = psutil.Process(process_id)

        # Get the path of the executable file
        exe_path = process.exe()

        return exe_path
    else:
        raise NotImplementedError()


def quit2(s):
    subprocess.call(['taskkill', '/F', '/IM', s])


def active_window_title():
    active_window = gw.getActiveWindow()
    while not active_window:
        active_window = gw.getActiveWindow()
        time.sleep(0.1)
    if sys_wrapper.is_windows():
        return gw.getActiveWindow().title
    else:
        return gw.getActiveWindow().title()


def active_window_bounds():
    if sys_wrapper.is_windows():
        active_window = gw.getActiveWindow()
        if active_window is not None:
            return active_window.left, active_window.top, active_window.left + active_window.width, active_window.top + active_window.height
        else:
            return None
    else:
        return TMCommonAppleScript_wrapper.GetActiveWindowBounds()


def active_window_screen_section():
    bounds = active_window_bounds()
    for x in ScreenSection.Type:
        logz(f"{x.name}:{x.value.bounds}")
        logz(f"match:{x.value.bounds == bounds}")
        if x.value.bounds == bounds:
            return x.value
    return None


def is_active_window_explorer():
    logz(f"sys_wrapper.is_windows():{sys_wrapper.is_windows()}")
    if sys_wrapper.is_windows():
        active_window = gw.getActiveWindow()
        if active_window is not None:
            class_name = win32gui.GetClassName(active_window._hWnd)
            if "CabinetWClass".lower() in class_name.lower():
                return True
            else:
                return False
        else:
            return False
    else:
        is_active_window("Finder")


def wait_for_active_window_explorer():
    counter = 0
    while True:
        _active_window_title = active_window_title()
        logz(f"active_window_title:{_active_window_title}")
        if is_active_window_explorer():
            return
        if counter > 100:
            logz("timeout")
            return
        counter = counter + 1
        time.sleep(0.1)


def is_active_window_jetbrains():
    if sys_wrapper.is_windows():
        active_window = gw.getActiveWindow()
        if active_window is not None:
            class_name = win32gui.GetClassName(active_window._hWnd)
            if "sunawtframe" in class_name.lower():
                return True
            else:
                return False
        else:
            return False
    else:
        is_active_window("Android Studio")


# Does not always work for Windows
def is_active_window(*window_titles):
    return any(window_title.lower() in active_window_title().lower() for window_title in window_titles)


def find_window(*window_titles):
    for window_title in window_titles:
        window = gw.getWindowsWithTitle(window_title)
        if window:
            return window[0]
    return None


def bring_window_to_front(*window_titles):
    window = find_window(*window_titles)
    if window is not None:
        window.activate()


def wait_for_active_window(*window_titles, exact_match=False):
    counter = 0
    while True:
        _active_window_title = active_window_title()
        logz(f"active_window_title:{_active_window_title}")
        for window_title in window_titles:
            if exact_match:
                if window_title == _active_window_title:
                    return
            else:
                if window_title in _active_window_title:
                    return
        if counter > 100:
            return
        counter = counter + 1
        time.sleep(0.1)


def active_window_move(screenSection: ScreenSection):
    logz(f"screenSection:{screenSection}")
    logz(f"screenSection.height:{screenSection.height}")
    if sys_wrapper.is_windows():
        # Get the active window
        active_window = gw.getActiveWindow()
        if active_window is not None:
            # Move and resize the window
            active_window.moveTo(screenSection.x1, screenSection.y1)
            active_window.resizeTo(screenSection.width, screenSection.height)
        else:
            logz("No active window found.")
    else:
        TMCommonAppleScript_wrapper.SetBoundsOfActiveWindow(screenSection)

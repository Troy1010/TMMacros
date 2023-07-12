from ._Logger import logz  # noqa
import subprocess
from .ScreenSection import ScreenSection

def __getTMCommonAppleScriptCommandList(s: str):
    script = f"""
        set TM to load script POSIX file "/Users/gzmyrl/Scripts/TMMacros/Local2/Applescript/TMCommonAppleScript.scpt" as alias
        TM's {s}
        """
    return ['osascript', '-e', script]

def __runTMCommonAppleScript(s):
    subprocess.run(__getTMCommonAppleScriptCommandList(s), check=True)

def __runTMCommonAppleScript2(s):
    return subprocess.run(__getTMCommonAppleScriptCommandList(s), check=True, capture_output=True, text=True).stdout.rstrip('\n')

def SetBoundsOfActiveWindow(screenSection: ScreenSection):
    logz(f"screenSection:{screenSection}")
    __runTMCommonAppleScript(f"SetBoundsOfActiveWindow({screenSection.x1}, {screenSection.y1}, {screenSection.x2}, {screenSection.y2})")

def GetActiveExplorerWindowDir():
    return __runTMCommonAppleScript2("GetActiveExplorerWindowDir()")

def NewTerminalWindow():
    return __runTMCommonAppleScript2("NewTerminalWindow()")

def GetActiveWindowBounds():
    s = __runTMCommonAppleScript2("GetActiveWindowBounds()")
    return tuple(map(int, s.split(", ")))

def OpenObsidian():
    return __runTMCommonAppleScript("OpenObsidian()")


import subprocess
import webbrowser

from . import TMCommonAppleScript_wrapper
from . import sys_wrapper
from ._Logger import logz  # noqa


def launch_obsidian_at_w_justin_todo():
    if sys_wrapper.is_windows():
        webbrowser.open(r"obsidian://open?vault=Troy1010&file=Coding%2FwJustin%2FTODO")
    else:
        raise NotImplementedError()


def launch_obsidian():
    if sys_wrapper.is_windows():
        command = "start obsidian://open/?vault=Troy1010"
        subprocess.check_output(command, shell=True)
    else:
        TMCommonAppleScript_wrapper.OpenObsidian()

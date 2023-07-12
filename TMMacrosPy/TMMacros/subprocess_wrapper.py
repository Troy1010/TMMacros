import subprocess
from typing import Optional

from . import sys_wrapper
from ._Logger import logz  # noqa


def launchTerminal(directory: Optional[str]):
    if sys_wrapper.is_windows():
        command = 'start cmd.exe'
        if directory is not None:
            command = f'{command} /K "cd /d {directory} && title Command Prompt at {directory}"'
        logz(f'command: {command}')
        subprocess.call(command, shell=True)
    else:
        if directory is not None:
            command = ['open', '-a', 'Terminal', directory]
            logz(f'command: {command}')
            subprocess.run(command)
        else:
            script = 'tell application "Terminal" to do script ""'
            subprocess.run(['osascript', '-e', script])

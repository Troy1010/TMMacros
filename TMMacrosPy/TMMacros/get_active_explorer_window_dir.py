from . import sys_wrapper
from ._Logger import logz  # noqa
import re
from . import TMCommonAppleScript_wrapper

if (sys_wrapper.is_windows()):
    from .get_window_text_windows import get_window_text_windows


def get_active_explorer_window_dir():
    if (sys_wrapper.is_windows()):
        text = get_window_text_windows()
        match = re.search(r'Address: (.*)', text)
        if match:
            return match.group(1)
    else:
        return TMCommonAppleScript_wrapper.GetActiveExplorerWindowDir()
import subprocess

from ._Logger import logz  # noqa
from . import config
from . import sys_wrapper


def launch_folder_tmmacros():
    if sys_wrapper.is_windows():
        subprocess.check_output(f'explorer {config.tmmacros}')
    else:
        raise NotImplementedError()

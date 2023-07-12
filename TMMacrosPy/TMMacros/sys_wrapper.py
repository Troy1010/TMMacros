import sys

from ._Logger import logz  # noqa


def is_windows():
    return sys.platform.startswith('win')

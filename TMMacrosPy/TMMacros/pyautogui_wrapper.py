import pyautogui
from .ScreenType import ScreenType
from ._Logger import logz  # noqa

def getScreenType():
    width, height = pyautogui.size()
    if width == 3840 and height == 2160:
        return ScreenType.z4k
    elif width == 2560 and height == 1440:
        return ScreenType.QHD
    elif width == 1920 and height == 1080:
        return ScreenType.z1080p
    else:
        return ScreenType.OTHER
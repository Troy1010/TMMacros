from enum import Enum, auto
from .ScreenType import ScreenType
from dataclasses import dataclass
from . import pyautogui_wrapper
from . import sys_wrapper
from ._Logger import logz

_screenType = pyautogui_wrapper.getScreenType()

if sys_wrapper.is_windows():
    _posXLeft = -7
else:
    _posXLeft = 0

_posYTopAlmost = 26
_posYTopAlmost2 = 26 * 2

_posXRight = 2560

if sys_wrapper.is_windows():
    _posYBot = 1417
else:
    _posYBot = 1377

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _posXBigRight = 629
    else:
        _posXBigRight = 508
elif _screenType == ScreenType.z1080p:
    _posXBigRight = 466
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    _posXBigRightThree = 566
elif _screenType == ScreenType.z1080p:
    _posXBigRightThree = 401
else:
    raise NotImplementedError()

if sys_wrapper.is_windows():
    _posYTop = -1
else:
    _posYTop = 25

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _xHalfway = 1294
    else:
        _xHalfway = 1279
elif _screenType == ScreenType.z1080p:
    _xHalfway = 974
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _widthHalfway = 1294
    else:
        _widthHalfway = 1279
elif _screenType == ScreenType.z1080p:
    _widthHalfway = 974
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _yHalfway1 = 712
    else:
        _yHalfway1 = 645
elif _screenType == ScreenType.z1080p:
    _yHalfway1 = 532
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _yHalfway2 = _yHalfway1 - 10  # I have no idea why this is necessary for windows.
    else:
        _yHalfway2 = _yHalfway1
elif _screenType == ScreenType.z1080p:
    _yHalfway2 = _yHalfway1
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _heightHalfway = 712
    else:
        _heightHalfway = 620
elif _screenType == ScreenType.z1080p:
    _heightHalfway = 532
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    if sys_wrapper.is_windows():
        _height_fullway_almost_2 = 1360
    else:
        _height_fullway_almost_2 = 1330
elif _screenType == ScreenType.z1080p:
    _height_fullway_almost_2 = 999
else:
    raise NotImplementedError()

if _screenType == ScreenType.QHD:
    _width_big_right_three = 2005
elif _screenType == ScreenType.z1080p:
    raise NotImplementedError()
else:
    raise NotImplementedError()


@dataclass
class ScreenSection:
    x1: int
    y1: int
    x2: int
    y2: int

    @property
    def width(self):
        return self.x2 - self.x1

    @property
    def height(self):
        return self.y2 - self.y1

    @property
    def bounds(self):
        return (self.x1, self.y1, self.x2, self.y2)

    def withTopLeftCornerAdjustedDownLeft(self, count=0):
        newX = self.x1 - 30 * count
        newY = self.y1 + 30 * count
        return ScreenSection(newX, newY, self.x2, self.y2)


class Type(Enum):
    top_left = ScreenSection(_posXLeft, _posYTop, _xHalfway, _yHalfway1)
    bot_left = ScreenSection(_posXLeft, _yHalfway2, _xHalfway, _posYBot)
    left = ScreenSection(_posXLeft, _posYTop, _xHalfway, _posYBot)
    right = ScreenSection(_xHalfway, _posYTop, _posXRight, _posYBot)
    big_right = ScreenSection(_posXBigRight, _posYTop, _posXRight, _posYBot)
    big_right_two = big_right.withTopLeftCornerAdjustedDownLeft(1)
    big_right_three = big_right.withTopLeftCornerAdjustedDownLeft(2)
    big_right_four = big_right.withTopLeftCornerAdjustedDownLeft(3)
    big_right_five = big_right.withTopLeftCornerAdjustedDownLeft(4)

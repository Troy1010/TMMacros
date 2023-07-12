import logging
import os
# Settings
bWriteLog = True
bPrint = True


# Get the absolute path of the current script file
current_dir = os.path.dirname(os.path.abspath(__file__))
sLogFile = os.path.join(current_dir, 'TMLog.log')

TMLog = logging.getLogger(__name__)
TMLog.setLevel(logging.DEBUG)
try:
    os.remove(sLogFile)
except FileNotFoundError:
    pass
if bWriteLog:
    TMLog.addHandler(logging.FileHandler(sLogFile))
if bPrint:
    vConsoleHandler = logging.StreamHandler()
    vConsoleHandler.setLevel(logging.WARNING)
    TMLog.addHandler(vConsoleHandler)

def logz(msg):
    TMLog.debug(str(msg))
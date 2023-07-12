
#include <TM_CommonAHK>

;  Keyset
XButton1::F18
MButton::WinTab()
CapsLock::F6
~r::
    switch ScreenType() {
        case ScreenType.z4k:
			MouseGetPos, x ,y
			MouseMove, 1041, 943
			MouseClick
			MouseMove, x, y
		default:
			MsgBox2("Unhandled ScreenType:" + ScreenType())
    }
	return
    



#include <TM_CommonAHK>

;  Keyset
q::Enter
XButton1::F14
l::Send { alt down }
k::Send { alt up }
!Tab::
    SendInput, {Alt Up}
	Sleep, 20
    SendInput, {Tab}
    SendInput, {Alt Down}
    return
    


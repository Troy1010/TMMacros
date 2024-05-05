;-------Notes
; When adding an include for a specific window, make sure to also add a check in IsDefaultContext
;
;-------Settings
bDebug := false
Process, Priority, , H
;
init_TM_CommonAHK()
;-------Globals
iXB2Count := 0
bEasyResetMode := false
fScrollFastTimer := 0
iScrollCount := 0
bScrollingFast := false
fTimestamp := 0
timestampSkypeMute = %A_TickCount% ; currently should be in SkypeMute, but idk how to refactor it
;-------Loop
;Loop
;{
;	if (fScrollFastTimer > 0 and !bScrollingFast) {
;		fScrollFastTimer := Max(0,fScrollFastTimer - GetTimePassed(fTimestamp))
;	}
;	if (iScrollCount > 0) {
;		if (GetKeyState("WheelUp","P") != 0) ;is this necessary with SendInput?
;		{
;			if (iScrollCount > 30) {
;				iScrollCount -= 3
;				SendInput {Click WheelUp 3}
;			}
;			else {
;				iScrollCount -= 1
;				SendInput {Click WheelUp}
;			}
;		}
;	}
;	else if (iScrollCount < 0) {
;		if (GetKeyState("WheelDown","P") != 0)
;		{
;			if (iScrollCount < -30) {
;				iScrollCount += 3
;				SendInput {Click WheelDown 3}
;			}
;			else {
;				iScrollCount += 1
;				SendInput {Click WheelDown}
;			}
;		}
;	}
;	sleep 2
;}
;-------End Init
return
;-------Safety Exit
^Escape::ExitApp
;-------Dependencies
#include <TM_CommonAHK>
#include <TM_Commands>
;-------Helper Functions
RunTMMacroPy(s) {
	oldWorkingDirectory := A_WorkingDir
	SetWorkingDir, C:\TMLocal\Coding\AllLanguages\TMMacros\TMMacrosPy\ApiLink_Windows\
	Run, %s%
	SetWorkingDir, oldWorkingDirectory
}
RunTMMacroJs(s) {
	RunWait, "C:\Users\troys\AppData\Roaming\npm\ts-node" "C:\TMLocal\Coding\AllLanguages\TMMacros\TMMacrosJs\ApiLink\%s%", , Hide
}
CloseChromeWindow() {
	Send {ctrl down}w{ctrl up}
}
EasyResetMode() {
	global bEasyResetMode
	bEasyResetMode := true
}
ResetGlobals() {
	global bEasyResetMode
	global iXB2Count
	global fScrollFastTimer
	global iScrollCount
	global bScrollingFast
	bEasyResetMode := false
	iXB2Count := 0
	fScrollFastTimer := 0
	iScrollCount := 0
	bScrollingFast := false
	SetTimer, WaiterScroll_XB1Context, off
	SetTimer, WaiterXB2, off
}
IsDefaultContext() {
	return !WinActive("Heroes of the Storm") and !WinActive("Warhammer: Vermintide 2") and !WinActive("Path") and !WinActive("Factorio") and !WinActive("Risk") and !WinActive("Monster Hunter Rise") and !WinActive("Dragon Age: Origins") and !WinActive("Dragon Age II") and !WinActive("Oblivion") and !WinActive("Path of Exile") and !WinActive("BOKURA") and !WinActive("They Are Billions") and !WinActive("Check the error message :)") and !WinActive("FTL") and !WinActive("GTFO") and !WinActive("WWZ CLIENT")
}
OpenFolderAndMoveToSection(path, sectionEnumIndex) {
	Run, Explorer %path%
	WinGet, vIgnorablePID, PID, A
	WaitUntilWinTextActive(path, vIgnorablePID)
	MoveAWinToSection(sectionEnumIndex)
}
;-------Labels
WaiterScroll_XB1Context:
	fScrollFastTimer := 0
	bScrollingFast := false
	SetTimer, WaiterScroll_XB1Context, off
	return
WaiterXB2:
	ResetGlobals()
	SoundPlay, res\26777__junggle__btn402_edited_quiet.wav
	SetTimer, WaiterXB2, off
	return
;-------Keyset
#if IsDefaultContext()
MButton::WinTab()
XButton1::F18
	return
XButton2::
	timestampSkypeMute = %A_TickCount% ;Should be refactored out to SkypeMute
	if (bEasyResetMode)
	{
		ResetGlobals()
	}
	else
	{
		iXB2Count += 1
	}
	SetTimer, WaiterXB2, 500
	return
XButton2 Up::
	SetTimer, WaiterXB2, off
	return
#+s::
	Run "res\ScreenSnip"
	return
#if IsDefaultContext() and (iXB2Count == 1)
LButton::
	ResetGlobals()
	if (GetKeyState("XButton2","P")) {
		MsgBox "Nothing is assigned for that key"
	} else {
		RunTMMacroJs("openGitClient.js")
	}
	return
RButton::
	ResetGlobals()
	if (GetKeyState("XButton2","P")) {
		;MsgBox Playground Open
		;RunTMMacroPy("playground.pyw")
		RunTMMacroJs("playground.js")
		;MsgBox Playground Close
	} else {
		;RunTMMacroPy("auto_move.pyw")
		RunTMMacroJs("autoMove.js")
	}
	return
XButton1 Up::
	ResetGlobals()
	if (GetKeyState("XButton2","P")) {
		RunTMMacroJs("launchObsidian.js")
	} else {
		OpenFolderAndMoveToSection("C:\", Constants.ScreenSectionEnum.BotLeft)
	}
	return
WheelUp::
	EasyResetMode()
	if (!bScrollingFast) {				
		if (fScrollFastTimer < 525) {	;x = z/r
			fScrollFastTimer += 477		;y = z/((z-1)*r)
		}								;z:scrolls required		2.1scrolls required
		else {							;r:scrolls/sec			4scrolls/s
			iScrollCount += 26
			bScrollingFast := true
		}
	}
	if (bScrollingFast) {
		iScrollCount += 15
	}
	else {
		iScrollCount += 2
	}
	SetTimer, WaiterScroll_XB1Context, 500
	return
WheelDown::
	EasyResetMode()
	if (!bScrollingFast) {
		if (fScrollFastTimer < 525) {
			fScrollFastTimer += 477
		}
		else {
			iScrollCount -= 26
			bScrollingFast := true
		}
	}
	if (bScrollingFast) {
		iScrollCount -= 15
	}
	else {
		iScrollCount -= 2
	}
	SetTimer, WaiterScroll_XB1Context, 500
	return
#if IsDefaultContext() and (iXB2Count == 2)
LButton::
	ResetGlobals()
	;if (GetKeyState("XButton2","P") and GetKeyState("XButton1","P")) {
	;	SetTimer, WaiterXB2, off
	;	OpenFolderAndMoveToSection("C:\Dropbox\Projects\7DTD\Links_7DTD\VolatileHordes", Constants.ScreenSectionEnum.BotLeft)
	;} else {
	;	MoveAWinToSection(Constants.ScreenSectionEnum.Left)
	;}
	if (GetKeyState("XButton2","P")) {
		RunWait C:\TMLocal\Coding\AllLanguages\TMMacros\Local1\Links\Oblivion
	} else {
		MoveAWinToSection(Constants.ScreenSectionEnum.Right)
	}
	return
RButton::
	ResetGlobals()
	if (GetKeyState("XButton2","P")) {
		CloseActiveWindow()
	} else {
		MoveAWinToSection(Constants.ScreenSectionEnum.Right)
	}
	return
XButton1 Up::
	ResetGlobals()
	if (!GetKeyState("XButton2","P")) {
		OpenFolderAndMoveToSection("C:\TMLocal\OblivionProject", Constants.ScreenSectionEnum.BotLeft)
	} else {
		OpenFolderAndMoveToSection("C:\TMLocal\Coding\AndroidStudio", Constants.ScreenSectionEnum.BotLeft)
	}
	return
WheelUp::EasyResetMode(),MinimizeMouseoverWindow()
WheelDown::EasyResetMode(),CloseMouseoverWindow()
#if IsDefaultContext() and (iXB2Count == 3)
LButton::
	ResetGlobals()
	if (GetKeyState("XButton2","P")) {
		RunWait C:\TMLocal\Coding\AllLanguages\TMMacros\Local1\Links\ModOrganizer
	} else {
		MoveAWinToSection(Constants.ScreenSectionEnum.TopLeft)
	}
	return
RButton::ResetGlobals(),SnapAWinToSection(Constants.ScreenSectionEnum.Fullscreen)
XButton1 Up::
	ResetGlobals()
	RunTMMacroPy("open_terminal.pyw")
	return
#if IsDefaultContext() and (iXB2Count == 4)
RButton::EasyResetMode(),CloseChromeWindow()
XButton1::ResetGlobals(),ControlSend2(,"{space}","ahk_exe Google Play Music Desktop Player.exe")
#if WinActive("BOKURA")
v::Enter
#if WinActive("Dungeon of the Endless")
#Include DungeonOfTheEndless.ahk
#if WinActive("Heroes of the Storm")
#Include HotS.ahk
#if WinActive("Warhammer: Vermintide 2")
#Include Vermintide.ahk
#if WinActive("Path of Exile")
#Include PoE.ahk
#if WinActive("They Are Billions")
#Include TheyAreBillions.ahk
#if WinActive("Oblivion")
#Include Oblivion.ahk
#if WinActive("Dragon Age: Origins")
#Include DragonAgeOrigins.ahk
#if WinActive("Dragon Age II")
#Include DragonAge2.ahk
#if WinActive("Factorio")
#Include Factorio.ahk
#if WinActive("Risk")
#Include RiskOfRain2.ahk
#if WinActive("Monster Hunter Rise")
#Include MonsterHunterRise.ahk
#if WinActive("WWZ CLIENT")
#Include WWZ.ahk
#if WinActive("FTL") or WinActive("Check the error message :)")
c::p
v::Send { Enter }
b::j
#if WinActive("Darktide")
F1::MsgBox2(NarrateWindow("ahk_id "+vMouseoverWin), true)
;#if true
;#Include SkypeMute.ahk
#if (bDebug = true)
F1::
	MsgBox2("aaa")
	return
F2::
	WinGetText, sText, A
	MsgBox2("sText:" . sText)
	Log("sText:" . sText)
	return
F3::
    MouseGetPos,,, vMouseoverWin
	MsgBox2(NarrateWindow("ahk_id "+vMouseoverWin), true)
	return
F4::
	WinGetPos, X, Y, W, H, A
	MsgBox2("X:" . X . " Y:" . Y . " W:" . W . " H:" . H, true)
	return
F5::
    MouseGetPos,x ,y , vMouseoverWin
	MsgBox2("x:" + x)
	MsgBox2("y:" + y)
	return
F6::
	vWinTitle:="ahk_exe Skype.exe"
    ControlFocus,, %vWinTitle%
    ControlSend,, ^m, %vWinTitle%
	return
F7::
	ControlSend2(,"b","ahk_exe Discord.exe")
	return
F8::
	MsgBox2(NarrateActiveWindow(),true)
	return
	
就是修改2个地方就可以了。
```
VimGroupIni := VimGroupIni . VimGroupDel . "ahk_exe chrome.exe"    ; 谷歌浏览器 
VimGroupIni := VimGroupIni . VimGroupDel . "ahk_exe TOTALCMD64.exe"    ; 谷歌浏览器 
VimGroupIni := VimGroupIni . VimGroupDel . "ahk_exe EXCEL.exe"    ; 谷歌浏览器 


^Capslock::
Esc:: ; Just send Esc at converting, long press for normal Esc.
^[:: ; Go to Normal mode (for vim) with IME off even at converting.
  KeyWait, Esc, T0.5
  if(ErrorLevel){ ; long press to Esc
    Send,{Esc}
    Return
  }
  VimSetNormal()
Return
```

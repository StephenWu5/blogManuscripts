```
; #window   +shift   ^ctrl !alt
;网页快捷跳转
;=========================================================================
#b::Run https://www.baidu.com/

#g::Run https://www.google.com/
#h::Run https://www.github.com/
#x::Run http://blog.sina.com.cn/u/2790806052/
!v::Run http://vimium.github.io/
#v::Run https://vim.ink
;#w::Run https://stephenwu5.home.blog/
#a::Run http://localhost:8080/
#z::Run https://www.zhihu.com/
;!k::Run https://wyagd001.github.io/zh-cn/docs/Hotkeys.htm
#k::Run https://www.amazon.cn/hz/mycd/myx#/home/content/pdocs/dateDsc/
#i::Run http://192.168.1.107:8081/swagger-ui.html
#u::Run https://cn.vuejs.org/v2/guide/
!u::Run https://vue.ant.design/docs/vue/introduce-cn/
#r::Run http://www.ruanyifeng.com/blog/
#e::Run https://github.com/kujian/front-end-collect
#f::Run https://risingstars.js.org/2018/zh/#section-react
;#n::Run https://www.npmjs.com/ 去掉吧
#n::Run http://nav.web-hub.cn/ 
#m::Run http://blog.didispace.com/tools/online-markdown/
#y::Run https://mail.qq.com
#q::Run https://www.wunderlist.com
!z::Run https://i.zhaopin.com/
;!b::Run https://www.zhipin.com/geek/account/management?ka=account_manage&random=1557884008178
;!s::Run http://www.szhongzi.com/
;!j::Run http://juejin.im/
#j::Run http://www.jianshu.com/
#c::Run https://home.cnblogs.com/u/StephenWu5/


;------------------------------------------------------------------------
!1::Run https://cloudpaybm-fat1.orangebank.com.cn/api/bank/login
!2::Run https://cloudpaycm-fat1.orangebank.com.cn/api/organ/login
!3::Run http://cloudpaystg.orangebank.com.cn/api/bank/login
!4::Run http://cloudpaystg.orangebank.com.cn/api/organ/login
!6::Run http://itpm-dlm.pab.com.cn/DLM/login.do
!7::Run https://cloudpaybm-fat2.orangebank.com.cn/api/bank/login
!8::Run https://cloudpaycm-fat2.orangebank.com.cn/api/organ/login
;-------------------------------------------------------------------------



;这里可以写一般代码片段和日常用语
;=========================================================================
::/wtf::{/}** `r
 * @description: 通用工具类  `r
 * @author: StephenWu5   `r
 * @date: 2018-12-13 15:38:27 `r
 ;*{/}
::/wFn::{/}** `r
 * cookie `r
 * @param name  cookie名称 `r
 * @param value 保存的内容，如果要保存对象或数组可以先转义成字符串 `r
 * @param options   保存时间 例：expires:6 保存6天，-1为删除cookie `r
 * @returns * `r
 ;*{/}
::/mail::981079142@qq.com
::/sign:: author: StephenWu5
::/con::console.log();
::/js1::javascript:;
::/js2::javascript
::/cl::console.log( 
::/startup::C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
;================汉语短语的开始==============================
::/fi::{{} fall"总务":i {}}
::/kfw:: 服务器开一下哈
::/d:: 按钮已点击 
::/gl:: 可以过来一下吗，有个问题在我这边说比较好 
::/gxdm:: 要是有时间的话，更新一下代码哈，好了和我说一声 
::/ku:: [大哭][大哭][大哭][大哭][大哭][大哭] 
;================汉语短语的结束==============================
;webstorm和npm
::/wsc:: <excludeFolder url="file://$MODULE_DIR$/build" /> 
<excludeFolder url="file://$MODULE_DIR$/node_modules" /> 
<excludeFolder url="file://$MODULE_DIR$/src/static" /> 
::/dc::E:\wandeDocument
::/npmd::npm run dev
::/npmb::npm run build
;git相关的命令
::/push::git push origin feature/sr_8068832-cloudpay_191128
::/pull::git pull origin feature/sr_8068832-cloudpay_191128 
::/add::git add -A
::/commit::git commit -m ''
::/master::git checkout feature/sr_8068832-cloudpay_191128 
::/company::git checkout company
::/mergec::git merge company
::/mergem::git merge feature/sr_8068832-cloudpay_191128
::/es6::<script src="https://unpkg.com/babel-transform-in-browser@6.4.6/dist/btib.min.js"></script>
::/ljs::lang='javascript'
;-------------------------------------------------------------------------

;前端代码片段
;=========================================================================
::/wSum:: const sum = (...arr) => [...arr].reduce((acc, val) => {{} acc + val, 0 {}});
;遍历函数
::/wMap:: arr.map((item,index,array)=>{{}`rreturn  null;`r}
::/wImg::<img src=''/>
;-------------------------------------------------------------------------

;截图颜色
;=========================================================================
^#c:: 
MouseGetPos, mouseX, mouseY
; 获得鼠标所在坐标，把鼠标的 X 坐标赋值给变量 mouseX ，同理 mouseY 
PixelGetColor, color, %mouseX%, %mouseY%, RGB 
; 调用 PixelGetColor 函数，获得鼠标所在坐标的 RGB 值，并赋值给 color 
StringRight color,color,6 
; 截取 color（第二个 color）右边的6个字符，因为获得的值是这样的：#RRGGBB，一般我们只需要 RRGGBB 部分。把截取到的值再赋给 color（第一个 color）。
clipboard = %color% 
; 把 color 的值发送到剪贴板 return
;-------------------------------------------------------------------------




;caps lock 映射为esc  用于gvim和webstorm中
;=========================================================================
classname = ""
keystate = ""
Capslock::
  WinGetClass, classname, A
;clipboard=%classname% 
;  if (classname = "Vim" || classname = "SunAwtFrame")
  if (true)
  {
    SetCapsLockState, Off
    Send, {ESC} 
  }
  else
  {
    GetKeyState, keystate, CapsLock, T
    if (keystate = "D")
      SetCapsLockState, Off
    else
      SetCapsLockState, On
    return
  }
  return

;CAPSLOCK::ESC
;  return


;=====================窗口的开始=============================
;alt + z 隐射为 alt + f4 
!x::Send, !{F4}               ; 关闭窗口
!w:: Send, ^w                 ; 关闭当前标签页
!b:: Send,{Browser_Back}
!f:: Send,{Browser_Forward}
!k::
Send {WheelUp}
Return
!j::
Send {WheelDown}
Return

;窗口最大化最小化
!m:: ;; alt-enter
    WinGet,S,MinMax,A
    if S=0
        WinMaximize,A
    else if S=1
        WinRestore,A
    else if S=-1
        WinRestore,A
    return
!n::
 WinMinimize, A
;=====================窗口的结束=============================

;=====================普通编辑器模范vim的开始=============================
;模拟vim上下左右
Capslock & j::
send, {Down}
Return
Capslock & k::
send, {Up}
Return
Capslock  & h:: 
send, {Left}
Return
Capslock & l::
send, {Right}
return

; 按单词移动
; Ctrl + 左/右 :: CapsLock + u/i
CapsLock & b::Send, ^{Left}
CapsLock & w::Send, ^{Right}

; 按页移动(翻页)
; PgUp/PgDn :: CapsLock + [或]
CapsLock & u::Send, {PgUp}
CapsLock & d::Send, {PgDn}

;;;;;;;;;;;;;删除一整行
^+d::   ;alt+d
Send {Home}   ;输出回车
Send +{End}   ;输入shitf键+end键
Send {delete}   ;输入delete键
return 
;;;;;;;;;;;;;复制一整行
CapsLock & y::
send {home}
send +{end}
send ^c   ;输出ctrl+c,复制一整行
return
;;;;;;;;;;;;;另起一行粘贴内容                                                                   
CapsLock & p::                                                                                        
send {end}                                                                                  
send {enter}                                                                                
send %clipboard%    ;将剪贴板的内容输出                                                  
return  

; 移动到文档首/尾
; Ctrl + Home/End :: CapsLock + -/=
CapsLock & t::Send, ^{Home}
CapsLock & g::Send, ^{End}


; 移动到行首/尾
; Ctrl + Home/End :: CapsLock + -/=
CapsLock & \::Send, {Home}
CapsLock & 4::Send, {End}

; 文本选择
; 按字符选中
; Shift + 左/下/上/右 :: Shift + h/j/k/l
; 按单词选中
; Shift + Ctrl + 左/下/上/右 :: Shift Ctrl + h/j/k/l
^+h::Send, +{Left}
^+j::Send, +{Down}
^+k::Send, +{Up}
^+l::Send, +{Right}

; 退格删除/向前删除, 按字符
CapsLock & n::Send, {Backspace}
CapsLock & m::Send, ^{Backspace}
CapsLock & ,::Send, {Delete}
CapsLock & .::Send, ^{Delete}

CapsLock & c:: Send, ^c                 ; 拷贝
CapsLock & v:: Send, ^v                 ; 粘贴
CapsLock & x:: Send, ^x                 ; 剪切
 
CapsLock & a:: Send, ^a                 ; 全选
CapsLock & s:: Send, ^s                 ; 保存


CapsLock & z:: Send, ^z                 ; 撤销
CapsLock & r:: Send, ^y                 ; 恢复

CapsLock & -:: Send, ^{-}               ; 向后重定位
CapsLock & =:: Send, ^+{-} 

;鼠标右键
CapsLock & 5:: 
Click, right,1
return
;=====================普通编辑器模范vim的结果=============================


;=====================鼠标的开始=============================
;模仿鼠标右键菜单
RAlt::
    Send,  +{F10}
return
;鼠标点击(鼠标单机要改)
!s:: 
Click, 1
Send, ^c
return
;鼠标右键
!r:: 
Click, right,1
return
!d:: 
MouseClick, left, , , 2
Send, ^c
return
!t:: ;循环点击示例
Click, 3
Send, ^c
return
;=====================鼠标的结束=============================

```

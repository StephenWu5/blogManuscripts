```
"""""""""""""""""""""""""""""""""""""""""
"""      My site  : http://0nly.me      "
"""      My email : suprsvn@gmail.com   "
"""""""""""""""""""""""""""""""""""""""""
filetype off
"""""""""""""""""""""""""vundle setting""""""""""""""""""""
source $VIMRUNTIME/vimrc_example.vim

set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
set langmenu=zh_CN.UTF-8                 "设置菜单语言
source $VIMRUNTIME/delmenu.vim    "导入删除菜单脚本，删除乱码的菜单
source $VIMRUNTIME/menu.vim          "导入正常的菜单脚本
language messages zh_CN.utf-8          "设置提示信息语言
"set noundofile
"setset undofile
set undodir=~/undodir "undofile统一管理
"Toggle Menu and Toolbar 菜单栏和工具栏隐藏了
set guioptions-=m
set guioptions-=T
"vim tab页显示序号
set guitablabel=%N:%M%t" Show tab numbers

set nocompatible              " be iMproved, required
filetype off                  " required
" 启用vundle来管理vim插件
set rtp+=D://bundle/Vundle.vim
call vundle#begin()
" 安装插件写在这之后
" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'godlygeek/tabular'
Plugin 'plasticboy/vim-markdown'
Plugin 'pangloss/vim-javascript'
Plugin 'alvan/vim-closetag'
Plugin 'maksimr/vim-jsbeautify'
Plugin 'othree/html5.vim'
Plugin '907th/vim-auto-save'
Plugin 'taghighlight'
Plugin 'thaerkh/vim-workspace'


"vue
Plugin 'posva/vim-vue'
"Plugin 'scrooloose/syntastic'   " 这个会带来修改时一卡卡

" es6

"Plugin 'L9'
Plugin 'Yggdroot/indentLine'    "对齐线

"颜色主题
Plugin 'altercation/vim-colors-solarized'
Plugin 'morhetz/gruvbox'
Plugin 'lsdr/monokai'
Plugin 'tomasr/molokai'

let g:mkdp_path_to_chrome = "open -a Google\ Chrome"
" 安装插件写在这之前
call vundle#end()            " required
filetype plugin on    " required
" 常用命令
" :PluginList       - 查看已经安装的插件
" :PluginInstall    - 安装插件
" :PluginUpdate     - 更新插件
" :PluginSearch     - 搜索插件，例如 :PluginSearch xml就能搜到xml相关的插件
" :PluginClean      - 删除插件，把安装插件对应行删除，然后执行这个命令即可
" h: vundle         - 获取帮助

"""""""""""""""""""""""""basic setting"""""""""""""""""""""

filetype plugin indent on
syntax on
set bsdir=buffer
set autochdir
set enc=utf-8
set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
set langmenu=zh_CN.UTF-8
language message zh_CN.UTF-8
set helplang=cn
source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim
"source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/mswin.vim
behave mswin
set nocompatible
set nobackup
set ignorecase 
set incsearch
set gdefault


set ruler
set shiftwidth=4
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
"set noautoindent
set clipboard+=unnamed
autocmd! bufwritepost _vimrc source $VIM/_vimrc
"颜色主题设置
set background=dark
colorscheme molokai
"colorscheme monokai
"colorscheme  murphy


"行号设置
set nu!
"改变行号文字色
"改变行号的背景色
highlight  LineNr cterm=bold ctermfg=red   
autocmd InsertLeave * highlight LineNr guifg=green 

autocmd InsertEnter * highlight LineNr guifg=green
"这行起作用了



"set guifont=Courier_New:h12:cANSI
"set guifontwide=YaHei\ Consolas\ Hybrid:h12
"set guifont=YaHei\ Consolas\ Hybrid:h12
"set guifont=Source\ Code\ Pro\ Semibold:h12
set scrolloff=3
set wildmode=list:longest
set ls=2

"set history=500                 "设定历史记录条数
set guifont=Courier\ New:h14    "英文字体及大小 
set gfw=幼圆:h14.5:cGB2312       "中文字体及大小
set nocp                        "去掉vi一致性模式，避免以前版本的bug和局限
filetype plugin on              "允许插件
filetype plugin indent on       "缩进
set completeopt=longest,menu    "打开文件类型检测, 加了这句才可以用智能补全
"set cursorline                  "突出显示当前行
syntax enable
syntax on                       "语言高亮
set cindent                     "C语言格式缩进
set smartindent                 "智能缩进
set tabstop=4                   "设定tab宽度为4个字符
set shiftwidth=4                "设定自动缩进为4个字符
set expandtab                   "用space替代tab的输入
set nobackup                    "无备份
"set noswapfile                  "无交换文件,注意，错误退出后无法恢复
autocmd InsertLeave * se nocul  "用浅色高亮当前行  
autocmd InsertEnter * se cul    "用浅色高亮当前行
set completeopt=preview,menu    "代码补全
set foldenable                  "允许折叠  
set foldmethod=indent           "折叠方式,包括indent,manual,marker等 
"使用语法高亮定义代码折叠
"set foldmethod=syntax
"打开文件是默认不折叠代码
set foldlevelstart=99
let Tlist_Exit_OnlyWindow = 1   "如果taglist窗口是最后一个窗口，则退出VIM
set iskeyword+=_,$,@,%,#,-      "带有左侧符号的单词不要被换行分割
set noerrorbells                "禁止错误声音提示
set novisualbell                "无错误屏幕闪烁提示
set t_vb=                       "清空错误响铃终端代码
set mouse=a                     "使能鼠标
" set lbr                         "在breakat字符处而不是最后一个字符处断行
" set textwidth=82                "设置最大列数，超出后自动换行
" set fo+=m                       "汉字超出最大列数自动换行
" set cc=82                       "在cc列加列数限制竖线
set so=5                        "光标上下两侧最少保留的屏幕行数scrolloff
set cmdheight=1                 "命令行高度设置
set hlsearch                    "搜索的字符高亮
" 第82列往后加下划线
"au BufWinEnter * let w:m2=matchadd('Underlined', '\%>' . 82 . 'v.\+', -1)



"如果文件外部改变，自动载入
if exists("&autoread")
    set autoread
endif

"下次开启VIM，自动将光标定位到关闭的位置
if has("autocmd")
  au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
endif


""""""""""""""""""""""""""""""""""""package settings"""""""""""""""


" toggle Tagbar display
map <F4> :TagbarToggle<CR>
" autofocus on Tagbar open
let g:tagbar_autofocus = 1

" NERDTree (better file browser) toggle
map <F3> :NERDTreeToggle<CR>

" tab navigation tab标签页面
map tn :tabn<CR>
map tp :tabp<CR>
map tm :tabm 
map tt :tabnew 
map ts :tab split<CR>
map <C-S-Right> :tabn<CR>
imap <C-S-Right> <ESC>:tabn<CR>
map <C-S-Left> :tabp<CR>
imap <C-S-Left> <ESC>:tabp<CR>

" navigate windows with meta+arrows
map <M-Right> <c-w>l
map <M-Left> <c-w>h
map <M-Up> <c-w>k
map <M-Down> <c-w>j
imap <M-Right> <ESC><c-w>l
imap <M-Left> <ESC><c-w>h
imap <M-Up> <ESC><c-w>k
imap <M-Down> <ESC><c-w>j

" fix some problems with gitgutter and jedi-vim
let g:gitgutter_eager = 0
let g:gitgutter_realtime = 0

" automatically close autocompletion window
autocmd CursorMovedI * if pumvisible() == 0|pclose|endif
autocmd InsertLeave * if pumvisible() == 0|pclose|endif

" old autocomplete keyboard shortcut
imap <C-J> <C-X><C-O>

" show pending tasks list
map <F2> :TaskList<CR>

" removes trailing spaces of python files
" (and restores cursor position)
autocmd BufWritePre *.py mark z | %s/\s\+$//e | 'z

" store yankring history file hidden
let g:yankring_history_file = '.yankring_history'

" save as sudo
ca w!! w !sudo tee "%"

" colors and settings of autocompletion
highlight Pmenu ctermbg=DarkBlue guibg=#C7EDCC guifg=Black
"highlight Pmenu ctermbg=4 guibg=LightGray
highlight PmenuSel ctermbg=8 guibg=#339900 guifg=White
highlight PmenuSbar ctermbg=24 guibg=White
"highlight PmenuThumb guibg=Black


" insert ipdb breakpoint with \b
nmap <leader>b Oimport ipdb;ipdb.set_trace()<ESC>

" CtrlP (new fuzzy finder)
let g:ctrlp_map = ',e'
nmap ,g :CtrlPBufTag<CR>
nmap ,G :CtrlPBufTagAll<CR>
nmap ,f :CtrlPLine<CR>
nmap ,m :CtrlPMRUFiles<CR>
nmap ,c :CtrlPCmdPalette<CR>
" to be able to call CtrlP with default search text
function! CtrlPWithSearchText(search_text, ctrlp_command_end)
    execute ':CtrlP' . a:ctrlp_command_end
    call feedkeys(a:search_text)
endfunction
" CtrlP with default text
nmap ,wg :call CtrlPWithSearchText(expand('<cword>'), 'BufTag')<CR>
nmap ,wG :call CtrlPWithSearchText(expand('<cword>'), 'BufTagAll')<CR>
nmap ,wf :call CtrlPWithSearchText(expand('<cword>'), 'Line')<CR>
nmap ,we :call CtrlPWithSearchText(expand('<cword>'), '')<CR>
nmap ,pe :call CtrlPWithSearchText(expand('<cfile>'), '')<CR>
nmap ,wm :call CtrlPWithSearchText(expand('<cword>'), 'MRUFiles')<CR>
nmap ,wc :call CtrlPWithSearchText(expand('<cword>'), 'CmdPalette')<CR>
" Don't change working directory
let g:ctrlp_working_path_mode = 0
" Ignore files on fuzzy finder
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/](\.git|\.hg|\.svn)$',
  \ 'file': '\.pyc$\|\.pyo$',
  \ }

" Ignore files on NERDTree
let NERDTreeIgnore = ['\.pyc$', '\.pyo$', '\.build', 'node_modules']
"autocmd VimEnter * silent NERDTree | wincmd p

" simple recursive grep
command! -nargs=1 RecurGrep lvimgrep /<args>/gj ./**/*.* | lopen | set nowrap
command! -nargs=1 RecurGrepFast silent exec 'lgrep! <q-args> ./**/*.*' | lopen
nmap ,R :RecurGrep 
nmap ,r :RecurGrepFast 
nmap ,wR :RecurGrep <cword><CR>
nmap ,wr :RecurGrepFast <cword><CR>

" run pep8+pyflakes validator
autocmd FileType python map <buffer> <leader>8 :call Flake8()<CR>
" rules to ignore (example: "E501,W293")
let g:flake8_ignore=""

" jedi-vim customizations
let g:jedi#popup_on_dot = 0
let g:jedi#use_tabs_not_buffers = 0
let g:jedi#goto_assignments_command = ",a"
let g:jedi#goto_definitions_command = ",d"
let g:jedi#documentation_command = "K"
let g:jedi#usages_command = ",o"
let g:jedi#completions_command = "<C-Space>"
let g:jedi#rename_command = "<leader>r"
let g:jedi#show_call_signatures = "1"
nmap ,D :tab split<CR>,d

" Change snipmate binding, to avoid problems with jedi-vim
"imap <C-i> <Plug>snipMateNextOrTrigger

" don't let pyflakes allways override the quickfix list
let g:pyflakes_use_quickfix = 0

" tabman shortcuts
let g:tabman_toggle = 'tl'
let g:tabman_focus  = 'tf'

" vim-airline settings
let g:airline_powerline_fonts = 0
let g:airline#extensions#whitespace#enabled = 1

" markdown
let g:vim_markdown_folding_disabled=1
"解决反引号的问题
let g:vim_markdown_conceal = 0
let g:vim_markdown_conceal_code_blocks = 0
let g:vim_markdown_math = 1
let g:vim_markdown_frontmatter = 1


" IndentLine
let g:indentLine_color_gui = '#A4E57E'


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"我也不知道这个函数是做什么用的，留着吧
"set diffexpr=MyDiff()
"function MyDiff()
  "let opt = '-a --binary '
  "if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  "if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  "let arg1 = v:fname_in
  "if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  "let arg2 = v:fname_new
  "if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  "let arg3 = v:fname_ou
  "if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  "if $VIMRUNTIME =~ ' '
    "if &sh =~ '\<cmd'
      "if empty(&shellxquote)
        "let l:shxq_sav = ''
        "set shellxquote&
      "endif
      "let cmd = '"' . $VIMRUNTIME . '\diff"'
    "else
      "let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    "endif
  "else
    "let cmd = $VIMRUNTIME . '\diff'
  "endif
  "silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3
  "if exists('l:shxq_sav')
    "let &shellxquote=l:shxq_sav
  "endif
"endfunction


"注释颜色
hi comment ctermfg=red  
highlight Comment ctermfg=green guifg=green
"下面两句可能没有用
highlight CTagsGlobalVariable ctermfg=5 "修改全局变量 红色
highlight CTagsMember ctermfg=8 "修改结构体成员 



"vim-vue的语法无法高亮问题
"autocmd FileType vue syntax sync fromstart
autocmd BufRead,BufNewFile *.vue setlocal filetype=vue.html.javascript.css
"解决vim-vue和nerdcommenter的冲突
let g:ft = ''
function! NERDCommenter_before()
  if &ft == 'vue'
    let g:ft = 'vue'
    let stack = synstack(line('.'), col('.'))
    if len(stack) > 0
      let syn = synIDattr((stack)[0], 'name')
      if len(syn) > 0
        exe 'setf ' . substitute(tolower(syn), '^vue_', '', '')
      endif
    endif
  endif
endfunction
function! NERDCommenter_after()
  if g:ft == 'vue'
    setf vue
    let g:ft = ''
  endif
endfunction
"vue语法检测器
let g:syntastic_javascript_checkers = ['eslint']



"auto-save 自动保存
let  g:auto_save =  1 "在Vim启动时启用AutoSave
let g:auto_save_silent = 1  " do not display the auto-save notification
let g:auto_save_write_all_buffers = 1  " write all (写入所以的缓存区)open buffers as if you would use :wa
let g:auto_save_events = ["InsertLeave", "TextChanged"]   
"自动保存2
"let g:workspace_autosave_always = 1
"


"youComplete 设置
let g:ycm_use_clangd = 0



set enc=gbk
set fencs=utf-8,gbk


```

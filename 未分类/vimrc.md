"""""""""""""""""""""""""""""""""""""""""
"""      My site  : StephenWu5   "
"""      My email : 781575265@qq.com   "
"""""""""""""""""""""""""""""""""""""""""


"""""""""""""""""""""""""vundle setting begin""""""""""""""""""""
set nocompatible              " be iMproved, required
filetype off                  " required
filetype plugin indent on              "允许插件
" 启用vundle来管理vim插件
"Vundle安装目录C:\Users\StephenWu5\.vim\bundle\Vundle.vim
set rtp+=~/.vim/bundle/Vundle.vim    
call vundle#begin()
" 安装插件写在这之后
" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

"基础工具
"markdown
Plugin 'plasticboy/vim-markdown'
"自动保存（可能删）
"Plugin '907th/vim-auto-save'
"语法高亮
"Plugin 'taghighlight'

"文件内快速定位
Plugin 'easymotion/vim-easymotion'

"前端
Plugin 'posva/vim-vue'
Plugin 'pangloss/vim-javascript'
Plugin 'alvan/vim-closetag'
Plugin 'maksimr/vim-jsbeautify'
Plugin 'othree/html5.vim'

"查找工具
Plugin 'rking/ag.vim'
"set rtp+=/home/harriszh/.fzf/
Plugin 'junegunn/fzf', 
Plugin 'junegunn/fzf.vim',
"替换工具
Plugin 'brooth/far.vim'

"对齐线
Plugin 'Yggdroot/indentLine'  

"状态条
Plugin 'bling/vim-airline'

"静态语法检查 lint插件(需要依赖) npm install eslint –g
"eslintrc可以修改配置
"Plugin 'w0rp/ale'
"Plugin 'dense-analysis/ale'

"自动格式化(需要依赖)
"Plugin 'sbdchd/neoformat'

"tagBar 代码大纲（需要依赖etags.exe）
Plugin 'majutsushi/tagbar'
"vim-interestingwords 代码高亮，看一些复杂的代码时
Plugin 'lfv89/vim-interestingwords'

"改符号成双成对
Plugin 'tpope/vim-surround'

"git （三个插件）
"git 命令
Plugin 'tpope/vim-fugitive'
"gv.vim 查看提交记录 
Plugin 'junegunn/gv.vim'
"git 显示文件的变动
"Plugin 'airblade/vim-gitgutter'

"颜色主题
Plugin 'lsdr/monokai'
Plugin 'tomasr/molokai'

let g:mkdp_path_to_chrome = "open -a Google\ Chrome"
" 安装插件写在这之前
call vundle#end()            " required
" 常用命令
" :PluginList       - 查看已经安装的插件
" :PluginInstall    - 安装插件
" :PluginUpdate     - 更新插件
" :PluginSearch     - 搜索插件，例如 :PluginSearch xml就能搜到xml相关的插件
" :PluginClean      - 删除插件，把安装插件对应行删除，然后执行这个命令即可
" h: vundle         - 获取帮助
"""""""""""""""""""""""""vundle setting end""""""""""""""""""""

"""""""""""""""""""""""""basic setting begin"""""""""""""""""""""
filetype plugin indent on              "允许插件
syntax on
set langmenu=zh_CN.UTF-8                 "设置菜单语言
language messages zh_CN.utf-8          "设置提示信息语言
"set history=500                 "设定历史记录条数
set guifont=Courier\ New:h16    "英文字体及大小 
set bsdir=buffer
set autochdir
"set enc=utf-8
"set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set enc=gbk
set fencs=gbk
"支持Rg
if has('win32')
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936,utf-16le,cp1252,iso-8859-15,ucs-bom
set encoding=utf-8 nobomb
set fileformats=unix,dos,mac
else 
"支持Ag
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
endif



set helplang=cn
source $VIMRUNTIME/mswin.vim
source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/delmenu.vim    "导入删除菜单脚本，删除乱码的菜单
source $VIMRUNTIME/menu.vim          "导入正常的菜单脚本

behave mswin
set nocompatible
set nobackup
set ignorecase 
set incsearch
set gdefault

"undofile统一管理
set undodir=~/undodir "undofile统一管理
"Toggle Menu and Toolbar 菜单栏和工具栏隐藏了
set guioptions-=m
set guioptions-=T

"vim tab页显示序号
set guitablabel=%N:%M%t" Show tab numbers

set nocompatible              " be iMproved, required

set ruler
set shiftwidth=4
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
"set noautoindent
set clipboard+=unnamed
"颜色主题设置
set background=dark
colorscheme molokai
"colorscheme monokai
"colorscheme  murphy


"行号
:set nu 
"相对行号设置
set relativenumber
"改变行号文字色
"改变行号的背景色
highlight  LineNr cterm=bold ctermfg=red   
autocmd InsertLeave * highlight LineNr guifg=green 
autocmd InsertEnter * highlight LineNr guifg=green
autocmd! bufwritepost _vimrc source $VIM/_vimrc
"这行起作用了


set scrolloff=3
set wildmode=list:longest
set ls=2

"注释颜色
hi comment ctermfg=red  
highlight Comment ctermfg=green guifg=green
"下面两句可能没有用
"修改全局变量 红色
highlight CTagsGlobalVariable ctermfg=5 
"修改结构体成员 
highlight CTagsMember ctermfg=8 


set nocp                        "去掉vi一致性模式，避免以前版本的bug和局限
set completeopt=longest,menu    "打开文件类型检测, 加了这句才可以用智能补全
"set cursorline                  "突出显示当前行
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
set so=5                        "光标上下两侧最少保留的屏幕行数scrolloff
set cmdheight=1                 "命令行高度设置
set hlsearch                    "搜索的字符高亮

"如果文件外部改变，自动载入
if exists("&autoread")
    set autoread
endif

"下次开启VIM，自动将光标定位到关闭的位置
if has("autocmd")
  au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
endif

"刷新时间(与vim-gitgutter有关)
set updatetime=100


"Quickfix中文乱码
function! QfMakeConv()
   let qflist = getqflist()
   for i in qflist
      let i.text = iconv(i.text, "cp936", "utf-8")
   endfor
   call setqflist(qflist)
endfunction

au QuickfixCmdPost make call QfMakeConv()
""""""""""""""""""""""""""""""""""""package settings end"""""""""""""""


""""""""""""""""""""""""""""""""""""键盘映射的开始"""""""""""""""""""""""""""""""""""""""
"定义leader键
let mapleader=','
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

" navigate windows with meta+arrows （屏幕）
map <M-Right> <c-w>l
map <M-Left> <c-w>h
map <M-Up> <c-w>k
map <M-Down> <c-w>j
imap <M-Right> <ESC><c-w>l
imap <M-Left> <ESC><c-w>h
imap <M-Up> <ESC><c-w>k
imap <M-Down> <ESC><c-w>j

""""""""""""""""""""""""""""""""""""键盘映射的结束"""""""""""""""""""""""""""""""""""""""


""""""""""""""""""""""""""""""""""""插件配置的开始"""""""""""""""""""""""""""""""""""""""
" toggle Tagbar display (文件导航插件)
map <F4> :TagbarToggle<CR>
" autofocus on Tagbar open
let g:tagbar_autofocus = 1



" Ignore files on NERDTree （文件树，留着）
let NERDTreeIgnore = ['\.pyc$', '\.pyo$', '\.build', 'node_modules']
"autocmd VimEnter * silent NERDTree | wincmd p


" markdown 
let g:vim_markdown_folding_disabled=1
"解决反引号的问题
let g:vim_markdown_conceal = 0
let g:vim_markdown_conceal_code_blocks = 0
let g:vim_markdown_math = 1
let g:vim_markdown_frontmatter = 1

" IndentLine （对齐线）
let g:indentLine_color_gui = '#A4E57E'


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


"esaymotion 快速移动光标
let g:EasyMotion_do_mapping = 0 " Disable default mappings
" Jump to anywhere you want with minimal keystrokes, with just one key binding.
" `s{char}{label}`
nmap sss <Plug>(easymotion-overwin-f)
" or
" `s{char}{char}{label}`
" Need one more keystroke, but on average, it may be more comfortable.
nmap ss <Plug>(easymotion-overwin-f2)


"ale
" Enable ESLint only for JavaScript.
"let b:ale_linters = ['eslint']
" Equivalent to the above.
"let b:ale_linters = {'javascript': ['eslint']}
" Set this. Airline will handle the rest.
let g:airline#extensions#ale#enabled = 1


"Ag的配置，后面可能会删除
command! -bang -nargs=* Ag
  \ call fzf#vim#ag(<q-args>,
  \                 <bang>0 ? fzf#vim#with_preview('up:60%')
  \                         : fzf#vim#with_preview('right:50%:hidden', '?'),
  \                 <bang>0)

" Similarly, we can apply it to fzf#vim#grep. To use ripgrep instead of ag:
command! -bang -nargs=* Rg
  \ call fzf#vim#grep(
  \   'rg --column --line-number --no-heading --color=always --smart-case '.shellescape(<q-args>), 1,
  \   <bang>0 ? fzf#vim#with_preview('up:60%')
  \           : fzf#vim#with_preview('right:50%:hidden', '?'),
  \   <bang>0)

" Likewise, Files command with preview window
command! -bang -nargs=? -complete=dir Files
  \ call fzf#vim#files(<q-args>, fzf#vim#with_preview(), <bang>0)

""""""""""""""""""""""""""""""""""""插件配置的结束"""""""""""""""""""""""""""""""""""""""



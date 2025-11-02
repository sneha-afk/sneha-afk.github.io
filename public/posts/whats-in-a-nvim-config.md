---
title: "whats-in-a-nvim-config"
date: "2025-09-28"
tags: ["neovim", "config"]
---

## i use nvim btw

I certainly have a lot more to learn when it comes to using Vim/Neovim. The vast ecosystem and community that surrounds
Neovim is a meme itself, adding to the zeitgeist of using nvim, btw.

My first exposure to the Vim world was in CSE 13S at UCSC, where we learned pretty much everything. I worked with a small
`_vimrc` that just about made the experience less daunting to a freshman in college, and just about knew `:wq`. Earlier
this year, I decided I wanted to switch over to using Neovim for a majority of my editing, and quickly spent hours and hours
configuring it.

![What my daily config looks like](/images/nvim-daily-config.png)

In this post, I want to set up a minimal config, something that would have helped me a few months ago. While there are
plenty of ways I could improve this configuration, I mostly prioritize fast startup, performance, and _readability_ to
maintain more easily.

I will not include all the plugins that I use on a daily basis, or UI _niceties_ that are mostly for my eyes.

### about systems

I daily drive Windows 11 and WSL as needed. Nearly all of my configuration is completely OS-agnostic, as things should be! Anything specific to Windows will be in its own section.

To work out quirks, I will be writing this config in Windows, then testing on my WSL (running Ubuntu), but write any paths or settings in UNIX to be universal.

## setup

Starting off, installing Neovim. `scoop` and `winget` both maintain bleeding edge releases of Neovim, but `apt` and other Linux distributions may not.
The [installation instructions](https://github.com/neovim/neovim/blob/master/INSTALL.md) provide more details, and can be easily scripted to be easier to update.

### juggling configs

Neovim allows for easily switching between configurations, especially helpful in my case writing this! The `NVIM_APPNAME`
variable specifies which directory the configuration is in.

1. On Windows, the default is in `~\AppData\Local\nvim`
2. On UNIX systems that follow `XDG_CONFIG_HOME`, the default is in `~/.config/nvim`

I am calling the configuration I am making here `nvimatom`, placed in `~/config/nvimatom` (or `~\AppData\Local\nvimatom`),
so I would launch this with:

```bash
# bash
NVIM_APPNAME=nvimatom nvim
```

```powershell
# powershell, doing this prevents env var pollution;
# if you don't mind, you can also $env:NVIM_APPNAME="nvimatom"
nvim --cmd "let `$NVIM_APPNAME='nvimatom'"
```

Of course, this would be helpful to have as an alias:

```bash
alias nvimatom="NVIM_APPNAME=nvimatom nvim"
```

```powershell
function nvimatom { nvim --cmd "let `$NVIM_APPNAME='nvimatom'" @args}
```

## init

Once we open up Neovim with `nvim` (or any alias set in [#juggling configs](#juggling-configs)) we get:

![Blank Neovim configuration](/images/nvim-blank.png)

Every Neovim configuration starts with `init.lua` that is at the top-level of the config directory.

Let's first set up a _leader key_ that is used to create a new namespace for personal keymappings. I've seen usually _space_ or _comma_, I choose the latter as a preference (do people have faster thumbs?)

```lua
-- ~/.config/nvim/init.lua

vim.g.mapleader = ","
-- or vim.g.mapleader = "<Space>"
```

We'll be adding to this as we have more modules to load in.

## basic options

Let's talk file structure. Anything under `.config/nvim/lua` is a module that can be loaded in.

> To avoid namespace collisions, some choose to put all their files underneath something like `lua/user` so that
> `user.plugins` is differentiated versus just `plugins` if put under `lua/plugins`.

To be truly atomic, I will create a one-file config here just to keep it simple. `init.lua` is and will be the only file.

> Neovim's [Lua module documentation](https://neovim.io/doc/user/lua.html) is a must-bookmark.

`vim.o` is for setting global Vim options (equivalent to `:set`), and Neovim offers a Lua-extended [`vim.opt`](https://neovim.io/doc/user/lua-guide.html#_vim.opt) such that:

1. `vim.opt`: equivalent to `:set`
1. `vim.opt_global`: equivalent to `:setglobal`
1. `vim.opt_local`: equivalent to `:setlocal`

Just to get some down:

```lua
vim.opt.number = true
vim.opt.cursorline = true
vim.opt.smartcase = true -- Case-sensitive search once uppercase used
vim.opt.encoding = "utf-8"
vim.opt.smartindent = true

-- Assuming your terminal supports this
vim.opt.termguicolors = true

-- Reportedly speeds starttime if not done immediately
vim.opt.clipboard      = ""
vim.schedule(function()
  vim.opt.clipboard = vim.env.SSH_TTY and "" or "unnamedplus"
end)
```

And just an aesthetic choice, since the new default shipped themes are pretty nice:
```lua
vim.cmd("colorscheme sorbet")
```

This is a basic set of settings I absolutely rely on, since many others are default set in Neovim.

## keymappings

Neovim's [`vim.keymap`](https://neovim.io/doc/user/lua.html#_lua-module:-vim.keymap) module makes keymaps easy to manage.

> [`which-key.nvim`](https://github.com/folke/which-key.nvim) is a must for me to remember my keymaps.

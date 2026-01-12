---
title: "trovling-around"
date: "2026-01-11"
tags: ["project", "golang", "cli", "actually-solving-problems?"]
---

## trovl

In the past few weeks, I have developed [trovl](https://github.com/sneha-afk/trovl), a symbolic link manager. I set out to solve a problem I deal with every day: *setting up my environment across different platforms.* For the longest time I depended on [GNU `stow`](https://www.gnu.org/software/stow/) in my UNIX environments and manual Powershell scripts for Windows. 

Ideally, I wanted the same `stow`-like interface everywhere, plainly, without having to redo my entire setup from scratch. That is, my existing [dotfiles](https://github.com/sneha-afk/dotfiles) should plainly work without having to go through some new setup.

[chezmoi](https://www.chezmoi.io/) is an awesome tool that serves as the frontier of modern dotfile management in this regard: trovl is mostly fit to my own, simple needs.

### background

Symbolic links are a natural construct for one to understand. Introduced in ["A Fast File System for UNIX"](https://dl.acm.org/doi/10.1145/989.990) in 1984, symlinks allows for referencing files across the physical file system and can be used for both absolute and relative paths. This greatly saves space since the new index node (inode) for the symlink does not have all the data blocks of the entire target file, only its pathname.

### the name?

Not sure, I was going for something akin to having a *treasure trove* of files, as dotfiles are probably every developer's bread and butter.

## how it works: user-facing

The [documentation](https://sneha-afk.github.io/trovl/) for trovl should feel straightforward, simple, and mostly common sense. trovl is built on the industry standard [Cobra CLI](https://cobra.dev/) which abstracts away the CLI handling for me as the dev, and provides a common-sense interface for anyone familiar with CLIs. 

`trovl add`, `trovl remove`, and `trovl plan` (along with all of their aliases) are probably straightforward, but `trovl apply` is mostly the real solution to the problem I was having.

`trovl apply` takes in a *manifest* file written in JSON that specify:
1) the target file: as in, the actual file
2) the symlink: its path and name
3) which platforms the link applies to
4) which platforms should have a *override* specified so the symlink is different

This makes it very easy for (if I had a dime for every time I use this example in the docs):
```json
{
  "$schema": "https://github.com/sneha-afk/trovl/raw/main/docs/trovl_schema.json",
  "links": [
    {
      "target": "~/stuff/_vimrc",
      "link": "~/.vimrc",
      "platform_overrides": {
        "windows": { "link": "~/_vimrc" }
    }
  ]
}
```

And that's it. trovl will create this symlink, and account for the override specified as well.

## how it works: internally

The [schema](https://github.com/sneha-afk/trovl/raw/main/docs/trovl_schema.json) is mostly flat, with an array of links that are objects marshaled into easy structs in Go.

I used the `os` package for all file operations to ensure the cross-platform builds succeeded, and that the semantics around a symlink are nearly the same everywhere. Most of the source code is validating files and taking care of situations where a symlink may be overwritten, or an ordinary file could potentially be backed up (i.e, the default `.bashrc` could be backed up).

There's flags for running dry runs, verbosity, passing in decisions, etc.

### junctions?

While validating the choice of `os.Symlink` directly without any modifications, I came across the idea of [junction points on Windows](https://learn.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions#junctions), which are essentially symlinks that only reference directories. These are kept for legacy support and for bypassing UAC prompts if a symlink requires extra permissions. Modern symlinks (natively created with `mklink /D`) are more akin to UNIX symlinks created with `ln -s`.

[go-windows-junction](https://github.com/nyaosorg/go-windows-junction) is a Go package that creates junction points with syscalls if that is desired.

trovl makes pure soft/symbolic-links with no feature parity between platforms. As I personally believe **all software should be**, when possible.

### workflow
Walking through `trovl add` walks through nearly all aspects of trovl, minus manifest parsing:
1. Both the target and symlink paths are cleaned up according to the current OS's semantics, such as environment variables, slashes, etc.
1. A link is "constructed":
    1. Validate that the target file/directory exists
    1. Does the specified symlink already exist (i.e, its path)? If so:
        1. Is the existing file a symlink?
            1. Does it point to the *same* file that is about to be linked to (i.e, overwriting a copy)
        1. Is the existing file a directory?
        1. Does the user want to overwrite the symlink?
        1. Does the user want to backup a single, ordinary file if it will be replaced?
1. Create any parent directories for the symlink: `mkdir -p` is great
1. Finally, create the symlink

## conclusion

Could the workflow for a singular link be a much flatter branch structure to allow for more modular development as I expand on features? Could this, like any codebase, be cleaner? Perhaps, but for a version 1.0 of a CLI tool that is not performance-critical, nor handling much more complicated situations like chezmoi, I believed I did my best.

The development process for trovl reminded me how delightful it is to develop in Go. Having a single suite of tools for the entire development process is always welcome, and makes me more confident in shipping cross-platform and cross-architecture matrices. With any tool, shipping a straightforward binary that is standalone, with no dependencies other than having a filesystem, is an awesome feat.

I hope trovl could be a useful tool for someone else who wrangles with symlinks often in its compact, ~3 MB format.


#!/bin/sh
exec rsync --exclude=.git --exclude-from=.gitignore "$@"

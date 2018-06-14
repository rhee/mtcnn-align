:
rsync -avP --exclude=.git --exclude-from=.gitignore "$@"

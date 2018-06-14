:
rsync -avP --exclude=.git --exclude=node_modules --exclude=.cache "$@"

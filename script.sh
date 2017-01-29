ps aux | grep $1 | awk '{print $2}' | xargs kill
git reset --hard origin/master
git pull origin master
node server.js $1 $2
while getopts d flag
do
    case "${flag}" in
        d) DEV=true;;
    esac
done

if [ $DEV ]; then 
  echo "window._env_ = {" > ./env-config.js
  awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./env-config.js
  echo "}" >> ./env-config.js
else
  echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
  awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/.env >> /usr/share/nginx/html/env-config.js
  echo "}" >> /usr/share/nginx/html/env-config.js
fi


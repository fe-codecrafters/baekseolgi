#!/bin/bash

cd /var/frontend/ 
source /home/ec2-user/.bash_profile

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm 
  
pm2 describe app > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pnpm run build
  pm2 start pnpm --name app -- start -p 8080
else
  pm2 reload app
fi;
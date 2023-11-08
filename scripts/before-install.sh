#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source /home/ec2-user/.bash_profile

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 20
npm install -g pnpm
npm install -g prisma
npm install -g pm2

ln -sf $(which npm) /usr/local/bin/npm
ln -sf $(which node) /usr/local/bin/node
ln -sf $(which prisma) /usr/local/bin/prisma
ln -sf $(which pm2) /usr/local/bin/pm2

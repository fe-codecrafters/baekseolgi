  #!/bin/bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
  nvm install 20
  npm install -g pnpm
  npm install -g pm2

  ln -sf $(which npm) /usr/local/bin/npm
  ln -sf $(which node) /usr/local/bin/node
  ln -sf $(which yarn) /usr/local/bin/pnpm
  ln -sf $(which pm2) /usr/local/bin/pm2

// pm2 config
module.exports = {
  apps: [
    {
      name: "100seolgi-server",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/frontend",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "260M",
      cron_restart: "1 0 * * *",
      watch: "true",
      ignore_watch: ["node_modules"],
      env: {
        PORT: 8080,
      },
    },
  ],
};

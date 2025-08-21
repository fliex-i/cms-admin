module.exports = {
  apps: [
    {
      name: 'zizhuangbao',
      script: 'node_modules/.bin/egg-scripts',
      args: 'start --title=zizhuangbao',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        EGG_SERVER_ENV: 'prod',
      },
      interpreter: 'node',
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};

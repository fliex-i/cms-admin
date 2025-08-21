module.exports = {
  apps: [
    {
      name: 'cmsAdmin',
      script: 'npm',
      args: 'run dev',
      cwd: __dirname,
      env: {
        NODE_ENV: 'development',
        EGG_SERVER_ENV: 'local',
        PORT: 7001,
        MYSQL_HOST: '127.0.0.1',
        MYSQL_PORT: 3306,
        MYSQL_DATABASE: 'platform',
        MYSQL_USER: 'root',
        MYSQL_PASSWORD: 'xiaolin.fang2025',
      },
      interpreter: 'node',
      watch: true,
      max_memory_restart: '500M',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // 新增如下行
      post_stop: 'npm run stop',
    },
  ],
};

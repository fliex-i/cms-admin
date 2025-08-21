module.exports = {
  apps: [
    {
      name: 'cmsAdmin',
      script: 'npm',
      args: 'run dev',
      cwd: __dirname,
      interpreter: 'node',
      watch: false,
      max_memory_restart: '500M',
      error_file: '../logs/pm2-error.log',
      out_file: '../logs/pm2-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // 新增如下行
      post_stop: 'npm run stop',
    },
  ],
};

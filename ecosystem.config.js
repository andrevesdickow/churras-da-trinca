module.exports = {
  apps : [{
    name   : 'churras-da-trinca',
    script : 'npm start',
    env: {
      NODE_ENV: 'development',
      DATABASE_URL: 'file:./dev.db',
      CRYPTOGRAPHY_KEY: 'MbQeThWmZq4t7w!z',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
      NEXT_TELEMETRY_DISABLED: 1
    },
    env_production: {
      NODE_ENV: 'production',
      DATABASE_URL: 'file:./dev.db',
      CRYPTOGRAPHY_KEY: 'MbQeThWmZq4t7w!z',
      NEXT_PUBLIC_APP_URL: 'http://192.168.100.45:4000',
      NEXT_TELEMETRY_DISABLED: 1
    }
  }],
  deploy: {
    production: {
      user: 'andreves',
      host: '192.168.100.45',
      ref: 'origin/main',
      repo: 'git@github.com:andrevesdickow/churras-da-trinca.git',
      path: '/home/andreves/churras-da-trinca',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install --legacy-peer-deps && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};

module.exports = {
    apps: [
        {
            name: 'backend-template-mongodb',
            script: './dist/server.js',
            instances: 1,
            exec_mode: 'fork',

            watch: false,

            autorestart: true,

            max_memory_restart: '512M',

            env: {
                NODE_ENV: 'development'
            },

            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};



// pm2 start ecosystem.config.js --env production
module.exports = {
    environment: 'development',
    port: process.env.PORT,
    protocol: 'http',
    TAG: "development",
    dbConfig: {
        dbName: process.env.db_name,
        dbUrl: process.env.db_url,
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_pwd
    },
    user_secret: process.env.user_secret,
    admin_secret: process.env.admin_secret,
    isDev: true
};

module.exports = {
    environment: 'production',
    port: 7822,
    protocol : 'http',
    TAG: "production",
    dbConfig: {
        dbName: process.env.dbName,
        dbUrl: process.env.dbURL,
        options: {
        }
    },
    isProd: true,
};

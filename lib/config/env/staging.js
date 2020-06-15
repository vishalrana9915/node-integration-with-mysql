module.exports = {
    environment: 'staging',
    port: 4009,
    protocol: 'http',
    TAG: "staging",
    dbConfig: {
        dbName: process.env.dbName,
        dbUrl: process.env.dbURL,
        options: {
        }
    },
    swagger_port: 80,
    isStag: true,

};

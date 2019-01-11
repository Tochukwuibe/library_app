const config = {
    production: {
        SECRETE: process.env.SECRETE,
        DATABASE: process.env.MONGODB_URI,
        PORT: process.env.port
    },
    default: {
        SECRETE: 'Dev-secrete',
        DATABASE: 'mongodb://localhost/library',
        PORT: '3001'
    }
}

module.exports = process.env.NODE_ENV === 'production' ? config.production : config.default
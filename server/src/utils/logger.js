const winston = require('winston')

const looger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'error log', level: 'error'}),
        new winston.transports.Console()
    ]
})

module.exports = looger
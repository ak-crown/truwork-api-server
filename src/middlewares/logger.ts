import winston from 'winston'
import expressWinston from 'express-winston'

export const createStandardLogger = () => {
  const winstonTransports = [new winston.transports.Console()]
  const logLevel = process.env.NODE_ENV === 'development' ? 'info' : 'error'
  const useMeta = process.env.NODE_ENV === 'prod'

  const logger = expressWinston.logger({
    level: logLevel,
    transports: winstonTransports,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
    ),
    meta: useMeta, // optional: control whether you want to log the meta data about the request (default to true)
    msg: `{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
  return logger
}

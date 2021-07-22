export const environment = {
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
  COOKIE: process.env.COOKIE ? process.env.COOKIE : "false",
  PORT: process.env.PORT ? process.env.PORT : "3030",
  MONGODB_URI: process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/nest',
  ORIGIN: process.env.ORIGIN ? process.env.ORIGIN : 'http://localhost:4200',
  TOKEN: process.env.TOKEN ? process.env.TOKEN : 'secret',
}
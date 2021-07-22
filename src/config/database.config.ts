import {registerAs} from '@nestjs/config'

export const databaseConfig = registerAs('database',()=>({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DATABASE
}))

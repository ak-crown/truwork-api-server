import dotenv from 'dotenv-safe'
dotenv.config()

const createEnv = () => {
  const state = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL!,
    JWT_KEY: process.env.JWT_KEY!,
  }

  return state
}

export default createEnv()

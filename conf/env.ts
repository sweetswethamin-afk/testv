import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, 'env.dev');
console.log('Loading env from:', envPath);

dotenv.config({ path: envPath });

console.log('BASE_URL after dotenv:', process.env.BASE_URL);

const requiredEnv = ['BASE_URL', 'USER_NAME', 'PASSWORD'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env variable ${key}`);
  }
});

export const ENV = {
  BASE_URL: process.env.BASE_URL!,
  USER_NAME: process.env.USER_NAME!,
  PASSWORD: process.env.PASSWORD!,
};
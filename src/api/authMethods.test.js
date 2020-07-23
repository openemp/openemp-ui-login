import dotenv from 'dotenv';
// import { login } from './authMethods';

dotenv.config();

process.env.USER_API_PORT = process.env.PORT;

test('User login', async () => {
  // const data = await login('hono', 'password');
  // console.log(data.token);
});

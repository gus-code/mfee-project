import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export const envChecker = () => {
  const local = path.resolve('apps/api/.env.local');
  const fallbackEnvPath = path.resolve('apps/api/.env');

  if (fs.existsSync(local)) {
    dotenv.config({ path: local });
    console.log(`Loaded environment variables from ${local}`);
  } else if (fs.existsSync(fallbackEnvPath)) {
    dotenv.config({ path: fallbackEnvPath });
    console.log(`Loaded environment variables from ${fallbackEnvPath}`);
  } else {
    console.log('No environment files found.');
  }
};

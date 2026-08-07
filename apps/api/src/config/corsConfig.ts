const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Note: origin will be undefined from same route in local development
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

export default { corsOptions };

export const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.ENV === "dev" || process.env.TRUSTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    callback(new Error("Not Allowed By Cors"))
  },
  OptionsSuccessStatus: 200
}

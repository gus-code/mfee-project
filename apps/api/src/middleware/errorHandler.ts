// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // Log this for debug purposes
  console.error(err.stack);
  // Return custom error to user
  res.status(500).json({ error: 'Internal Server Error' });
};

export default { errorHandler };

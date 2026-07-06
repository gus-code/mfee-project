// Global error handler middleware
// Catches errors from all routes and returns a generic error message
// Usage: app.use(errorHandler) at the end of middleware chain
// For debugging, check the server console for stack traces
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // Log this for debug purposes
  console.error(err.stack);
  // Return custom error to user
  res.status(500).json({ error: "Internal server error" });
};

export default { errorHandler };

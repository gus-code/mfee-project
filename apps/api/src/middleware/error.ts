

export const errorHandler = (err, req, res, nest) => {
  console.log(err.stack);
  res.status(500).json({error: "internal server error"});
}

export default { errorHandler }
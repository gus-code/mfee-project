const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: 'Internal Server Error'});
    next();
};

export default errorHandler; 
const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  console.log('00000000000000000000000000000000000000000000000000000');
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('Error💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: err,
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log('stack ------ ', err.stack, '------😂😂😂😂😂😂😂😂😂');

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name };
    console.log(
      '999999999999999999999999999999999999',
      err,
      '-----------------------------',
    );
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    sendErrorProd(error, res);
  }
};

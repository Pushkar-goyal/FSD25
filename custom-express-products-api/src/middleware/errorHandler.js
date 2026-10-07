function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: 'Route not found.'
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
}

module.exports = { notFound, errorHandler };

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR HANDLER]`, err);

  const status = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(status).json({
    code: status,
    message
  });
};

export default errorHandler;


export const errorLog = (err, req) => {
  const error = {
    path: `[${req.method}] ${req.originalUrl}`,
    error: err.message,
    files: err.stack
  };

  console.log(error);
}
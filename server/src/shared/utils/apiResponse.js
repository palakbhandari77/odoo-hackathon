// src/shared/utils/apiResponse.js
const successResponse = (res, statusCode, message, data = {}, meta = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: Object.keys(meta).length ? meta : undefined,
  });
};

const errorResponse = (res, statusCode, message, details = null) => {
  const payload = {
    success: false,
    error: {
      message,
    },
  };

  if (details) {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
};

module.exports = {
  successResponse,
  errorResponse,
};
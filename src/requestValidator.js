const validateBody = (req) => {
  const payload = req.body.payload;
  if (!payload || !Array.isArray(payload)) {
    throw new Error('Invalid payload');
  }

  // further validations.....
};

module.exports = {
  validateBody
};

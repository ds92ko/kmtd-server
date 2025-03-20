import { validationRules } from '@/src/constants/validation.js';

export const validateRequest = (req, res, next) => {
  const url = new URL(req.originalUrl, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const reqData =
    req.method === 'DELETE' || req.method === 'GET'
      ? !Object.keys(req.params).length
        ? req.query
        : req.params
      : req.body;
  const pathnameKey = req.params.id
    ? pathname.split('/').slice(0, -1).concat('{id}').join('/')
    : pathname;
  const key = `${req.method}:${pathnameKey}`;
  const errors = Object.entries(validationRules[key]).reduce((acc, [key, rules]) => {
    const reqDataValue = reqData[key];

    if (rules.required && !reqDataValue) acc[key] = `${key} is required`;
    if (reqDataValue && rules.enum && !rules.enum.includes(reqDataValue))
      acc[key] = `${key} must be one of ${rules.enum.join(', ')}`;
    if (reqDataValue && rules.length) {
      const { min, max } = rules.length;

      if (reqDataValue.length < min || reqDataValue.length > max)
        acc[key] = `${key} must be between ${min} and ${max} characters`;
    }

    return acc;
  }, {});

  if (Object.keys(errors).length > 0) {
    req.errors = errors;
    return res.status(400).json({ errors });
  }

  next();
};

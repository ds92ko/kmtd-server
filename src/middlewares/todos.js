import { paramsMap } from '@/src/constants/params';

export const validateRequest = (req, res, next) => {
  const url = new URL(req.originalUrl, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const params = req.method === 'GET' ? req.query : req.body;
  const errors = Object.entries(paramsMap[pathname]).reduce((acc, [key, rules]) => {
    const param = params[key];

    if (rules.required && !param) acc[key] = `${key} is required`;
    if (param && rules.enum && !rules.enum.includes(param))
      acc[key] = `${key} must be one of ${rules.enum.join(', ')}`;

    return acc;
  }, {});

  if (Object.keys(errors).length > 0) {
    req.errors = errors;
    return res.status(400).json({ errors });
  }

  next();
};

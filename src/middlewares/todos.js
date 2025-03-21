import { validationRules } from '@/src/constants/validation.js';

export const validateRequest = (req, res, next) => {
  const url = new URL(req.originalUrl, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;
  const segments = pathname.split('/');
  const normalizedPath = segments
    .map(segment => (/^\d+$/.test(segment) ? '{id}' : segment))
    .join('/');
  const key = `${method}:${normalizedPath}`;
  const rules = validationRules[key];

  if (!rules) return next();

  const { query, params, body } = req;

  const errors = Object.entries({ query, params, body }).reduce((acc, [key, values]) => {
    if (!rules[key]) return acc;

    Object.entries(rules[key]).forEach(([field, rule]) => {
      const value = values[field];

      if (rule.required && !value) acc[field] = `${field} is required`;
      if (value && rule.enum && !rule.enum.includes(value))
        acc[field] = `${field} must be one of ${rule.enum.join(', ')}`;
      if (value && rule.length) {
        const { min, max } = rule.length;

        if (value.length < min || value.length > max)
          acc[field] = `${field} must be between ${min} and ${max} characters`;
      }
    });

    return acc;
  }, {});

  if (Object.keys(errors).length > 0) {
    req.errors = errors;
    return res.status(400).json({ errors });
  }

  next();
};

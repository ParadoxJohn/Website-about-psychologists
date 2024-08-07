import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  console.log('Headers:', req.headers);
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  console.log('Extracted token:', token);
  
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');
      req.userId = decoded._id;
      console.log('User authenticated:', req.userId);
      next();
    } catch (e) {
      console.error('Token verification failed:', e.message);
      return res.status(403).json({
        message: 'Немає доступу',
      });
    }
  } else {
    console.error('No token provided');
    return res.status(403).json({
      message: 'Немає доступу',
    });
  }
};
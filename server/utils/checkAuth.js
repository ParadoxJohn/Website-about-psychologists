import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');
      req.userId = decoded._id;
      next();
    } catch (e) {
      console.error('Token verification failed:', e.message);
      return res.status(403).json({
        message: 'немає доступу',
      });
    }
  } else {
    console.log('No token provided');
    return res.status(403).json({
      message: 'немає доступу',
    });
  }
};
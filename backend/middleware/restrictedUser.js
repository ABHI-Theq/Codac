import BlacklistTokenModel from '../models/BlacklistTokenModel.js';

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: 'Please login to access this route' });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ msg: 'Token is blacklisted. Please login again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: 'Token is invalid...' });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ msg: 'User does not exist' });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};
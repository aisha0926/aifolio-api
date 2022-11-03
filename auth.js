const jwt = require('jsonwebtoken');

// Create token
const createToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(data, process.env.SECRET, {});
};

// Verify token
const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token === undefined) {
      res.send({ auth: 'Failed. No token.' });
    } else {
      token = token.split(' ')[1];

      jwt.verify(token, process.env.SECRET, (err, decode) => {
        err && res.send({ message: err.message });

        req.user = decode;
        next();
      });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

// Admin verification
const verifyAdmin = (req, res, next) => {
  const { isAdmin } = req.user;

  isAdmin ? next() : res.send({ auth: 'Action Forbidden.' });
};

module.exports = {
  createToken,
  verifyToken,
  verifyAdmin,
};

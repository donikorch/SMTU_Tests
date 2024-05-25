require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/authUtils');
const configJWT = require('./configJWT');

// верификация токена REFRESH
function verifyRefreshToken(req, res, next) {
  try {
    const { refresh } = req.cookies;
    const { user } = jwt.verify(refresh, process.env.REFRESH);
    const { accessToken, refreshToken } = generateTokens({
      user: {
        id: user.id,
        login: user.login,
        name: user.role === 'student' ? user.name : null,
        firstName: user.role === 'admin' ? user.firstName : null,
        lastName: user.role === 'admin' ? user.lastName : null,
        middleName: user.role === 'admin' ? user.middleName : null,
        role: user.role,
        groupId: user.groupId || null,
      },
    });

    res.locals.user = user;
    res.cookie(configJWT.refresh.type, refreshToken, {
      maxAge: configJWT.refresh.expiresIn,
      httpOnly: true,
    });
    res.cookie(configJWT.access.type, accessToken, {
      maxAge: configJWT.access.expiresIn,
      httpOnly: true,
    });
    next();
  } catch (error) {
    res.clearCookie(configJWT.access).clearCookie(configJWT.refresh);
    next();
  }
}

// верификация токена ACCESS
function verifyAccessToken(req, res, next) {
  try {
    const { access } = req.cookies;
    const { user } = jwt.verify(access, process.env.ACCESS);
    res.locals.user = user;
    next();
  } catch (error) {
    verifyRefreshToken(req, res, next);
  }
}

module.exports = { verifyAccessToken };

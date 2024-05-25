// параметры для токенов
const jwtConfig = {
  access: {
    type: 'access',
    expiresIn: `${1000 * 60 * 10}`, // время жизни
  },
  refresh: {
    type: 'refresh',
    expiresIn: `${1000 * 60 * 60 * 12}`, // время жизни
  },
};

module.exports = jwtConfig;

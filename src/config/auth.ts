export default {
  jwt: {
    secret: process.env.APP_SECRET || 'testes',
    expiresIn: '7d',
  },
};

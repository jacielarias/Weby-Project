module.exports = ({ env }) => ({
  'color-picker': {
    enabled: true,
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
});

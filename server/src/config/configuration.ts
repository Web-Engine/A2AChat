export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
}); 
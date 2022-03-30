module.exports = {
  reactStrictMode: true,
  env: {
    dbURI: process.env.MONGODB_URI,
    appId: process.env.MORALIS_APP_ID,
    serverUrl: process.env.MRALIS_SERVER,
    host: process.env.HOST
  },
}

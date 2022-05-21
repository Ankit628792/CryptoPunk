module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['sample-api-data.vercel.app', 'images.unsplash.com', 'res.cloudinary.com', 'source.unsplash.com', 'gateway.pinata.cloud'],
  },
  env: {
    dbURI: process.env.MONGODB_URI,
    appId: process.env.MORALIS_APP_ID,
    serverUrl: process.env.MORALIS_SERVER,
    host: process.env.HOST,
    moralisApiKey: process.env.MORALIS_API_KEY,
    speedyNode: process.env.SPEEDY_NODE,
    contractAddress: process.env.CONTRACT_ADDRESS,
    nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
    giphyApi: process.env.GIPHY_API,
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretKey: process.env.PINATA_SECRET_KEY
  },
}

import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return 'Using current db connection'
  }
  // Use new db connection
  await mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return 'Using new db connection'
};

export default connectDB;
import mongoose from 'mongoose'
const NftSchema = new mongoose.Schema({
    name: { type: String, required: true },
    media: { type: String, required: true },
    nftCollection: { type: String },
    // nftCollection: { type: mongoose.Types.ObjectId },
    blockchain: { type: String },
    description: { type: String },
    price: { type: Number },
    dateRange: { type: Array },
    user: { type: String }
},
    {
        timestamps: true
    });

const Nft = mongoose.models.Nft || mongoose.model('Nft', NftSchema);

export default Nft
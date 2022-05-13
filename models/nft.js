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
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User" }
},
    {
        timestamps: true
    });

const Nft = mongoose.models.Nft || mongoose.model('Nft', NftSchema);

export default Nft

// token_address*	string
// example: 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
// The address of the contract of the NFT

// token_id*	string
// example: 15
// The token id of the NFT

// contract_type*	string
// example: ERC721
// The type of NFT contract standard

// token_uri	string
// The uri to the metadata of the token

// metadata	string
// The metadata of the token

// synced_at	string
// when the metadata was last updated

// amount	string
// example: 1
// The number of this item the user owns (used by ERC1155)

// name*	string
// example: CryptoKitties
// The name of the Token contract

// symbol*	string
// example: RARI
// The symbol of the NFT contract

// }
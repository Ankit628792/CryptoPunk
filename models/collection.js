import mongoose from 'mongoose'

const CollectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoURL: { type: String, required: true },
    featureURL: { type: String },
    bannerURL: { type: String },
    description: { type: String },
    blockchain: { type: String },
    category: { type: Array },
    earning: { type: Number },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
    {
        timestamps: true
    });

const Collection = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
export default Collection
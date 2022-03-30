
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    walletAddres: { type: String, required: true },
},
    {
        timestamps: true
    });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User
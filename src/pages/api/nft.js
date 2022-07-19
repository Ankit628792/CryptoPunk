// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createNft, getAllNfts, getNft } from '../../service/nft';
import connectDB from './db'

export default async function (req, res) {
    const user_connection=await connectDB.connect();
    if (req.method == 'GET') {
        req.query.id
            ? await getNft(req, res,user_connection)
            : await getAllNfts(req, res,user_connection);
    }
    else if (req.method == 'POST') {
        createNft(req, res,user_connection);
    }
    else {
        res.status(404).send({ msg: 'request not found' })
    }
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createNft, getAllNfts, getNft } from '../../service/nft';
import connectDB from './db'

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        req.query.id
            ? await getNft(req, res)
            : await getAllNfts(req, res);
    }
    else if (req.method == 'POST') {
        createNft(req, res);
    }
    else {
        res.status(404).send({ msg: 'request not found' })
    }
}
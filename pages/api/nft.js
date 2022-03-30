// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { del, get, post, put } from '../../service/nft';
import connectDB from './db'

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        req.query.id
            ? await get.getNft(req, res)
            : await get.getAllNfts(req, res);
    }
    if (req.method == 'POST') {
        post.createNft(req, res);
    }
    if (req.method == 'PUT') {
        put.updateNft(req, res);
    }
    if (req.method == 'DELETE') {
        await del.deleteNft(req, res);
    }
}
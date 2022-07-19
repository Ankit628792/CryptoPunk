// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCollection, getAllCollections, getCollection } from '../../service/collection';
import connectDB from './db'

export default async function (req, res) {
    const user_connection=await connectDB.connect();
    if (req.method == 'GET') {
        req.query.id
            ? await getCollection(req, res,user_connection)
            : await getAllCollections(req, res,user_connection);
    }
    else if (req.method == 'POST') {
        await createCollection(req, res,user_connection);
    }
    else {
        res.status(404).send({ msg: 'request not found' })
    }
}
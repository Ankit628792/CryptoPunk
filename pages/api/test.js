import connectDB from './db'

export default async function (req, res) {
    const client = await connectDB.connect()
    // console.log(client)
    let query = `SELECT * FROM test`
    let data = await client.query(query)
    console.log("table", data)
    res.send('hello')
}
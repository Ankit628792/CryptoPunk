import connectDB from "./db"

export default async function (req, res) {

    const cl = await connectDB.connect()

    res.send({ msg: 'hello', rs: rs.rows })
}


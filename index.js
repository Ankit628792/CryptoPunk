const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

const Collection = require('./service/collection/index');
const User = require('./service/user/index');
const Nft = require('./service/nft/index');



app.set(port , port);
app.use(express.json());
app.use(cors());

// start point for different routes
app.use('/collection', Collection);
app.use('/user', User);
app.use('/nft', Nft);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
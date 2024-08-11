const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
var cors = require('cors')
const port = process.env.PORT || 5000;

// middlewire
app.use(express.json());
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rfr5aqt.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      // await client.connect();

      const userCollection = client.db('gigzoomDb').collection('users');


      app.get('/users', async (req, res) => {
          const result = await userCollection.find().toArray();
          res.send(result);
      })

      app.get('/user', async (req, res) => {
          const email = req.query.email;
          const query = { email: email };
          const result = await userCollection.find(query).toArray();
          res.send(result);
      })
      
      app.post('/users', async (req, res) => {
          const userInfo = req.body;
          const {name,email,image, category } = userInfo;
          let coin = 0;
          if (category === 'Worker') {
              coin = 10;
          }
          else if (category === 'Task Creator') {
              coin = 50;
          }
          const newInfo = {name,email,image, category ,coin}
          const result = await userCollection.insertOne(newInfo);
          res.send(result);
          console.log(category);
      })



      // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('gigzoom id running');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
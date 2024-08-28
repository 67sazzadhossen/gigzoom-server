const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
var cors = require("cors");
const port = process.env.PORT || 5000;

// middlewire
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rfr5aqt.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("gigzoomDb").collection("users");
    const taskCollection = client.db("gigzoomDb").collection("taskCollection");
    const notificationCollection = client
      .db("gigzoomDb")
      .collection("notificationCollection");
    const submissionCollection = client
      .db("gigzoomDb")
      .collection("submissionCollection");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/user", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      const { name, email, image, category } = userInfo;
      let coin = 0;
      if (category === "Worker") {
        coin = 10;
      } else if (category === "Task Creator") {
        coin = 50;
      }
      const newInfo = { name, email, image, category, coin };
      const result = await userCollection.insertOne(newInfo);
      res.send(result);
    });

    app.post("/add-task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    // for worker
    app.get("/all-task", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      const result = await taskCollection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();

      // const result = await taskCollection.find().toArray();
      res.send(result);
    });

    app.get("/all-task/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });

    app.post("/worker-submission", async (req, res) => {
      const submissionData = req.body;
      const result = await submissionCollection.insertOne(submissionData);
      res.send(result);
    });

    app.get("/work-submission/:email", async (req, res) => {
      const email = req.params.email;
      const query = { worker_email: email };
      const result = await submissionCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/notification", async (req, res) => {
      const notify = req.body;
      const result = await notificationCollection.insertOne(notify);
      res.send(result);
    });

    app.get("/taskCount", async (req, res) => {
      const count = await taskCollection.countDocuments();
      res.send({ count });
    });

    // get all task by user email:for task creator to get her task
    app.get("/all-task/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "user.email": email };
      const options = {
        sort: { "user.post_time": -1 }, // -1 for descending order
      };
      const result = await taskCollection.find(query, options).toArray();
      res.send(result);
    });

    // delete single task by id: for task creator
    app.delete("/all-task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    // increase user coin:

    app.patch("/increase-coin/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };

      const value = req.body;
      const increase = parseFloat(value.value);

      const updateDoc = {
        $inc: { coin: +increase },
      };

      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // decrease user coin:

    app.patch("/decrease-coin/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };

      const value = req.body.value;
      console.log(value);
      const decrease = parseFloat(value);

      const updateDoc = {
        $inc: { coin: -decrease },
      };

      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("gigzoom id running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const autocannon = require("autocannon");
const { MongoClient } = require("mongodb");

// please change your constants with your ideal input.
const uri = "mongodb://127.0.0.1:27017/your-db";
const dbName = "your-db";
const collectionName = "mongo-collection";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const instance = autocannon({
    // change options base on your requirement, inputs below are just example's.
    url: "mongodb://127.0.0.1:27017/your-db",
    connections: 10,
    duration: 1200000,
    amount: 100000000,
    pipelining: 10,
    setupClient: async (client) => {
      await client.on("response", async () => {
        try {
          // you can change body of database input, and change your findOne query to something more complex.
          await collection.insertOne({
            name: "hossein",
            family: "khodabandeh ",
            age: 23,
            timestamp: new Date(),
          });
          await collection.findOne({ age: 23 });
        } catch (err) {
          console.log(err);
        }
      });
    },
  });
  autocannon.track(instance);
  instance.on("done", async () => {
    await client.close();
    console.log("Test completed");
  });
}

run().catch(console.error);

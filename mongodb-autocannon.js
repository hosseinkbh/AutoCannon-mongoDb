const autocannon = require("autocannon");
const { MongoClient } = require("mongodb");
const { inputs, dataForInsertaion, findOneQuery } = require("./data");

const {amount,collectionName,connections,dbName,duration,pipelining,uri} = inputs

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const instance = autocannon({
    url: uri,
    connections: connections,
    duration: duration,
    amount: amount,
    pipelining: pipelining,
    setupClient: async (client) => {
      await client.on("response", async () => {
        try {
          await collection.insertOne(dataForInsertaion);
          await collection.findOne(findOneQuery);
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

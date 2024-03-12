import { MongoClient, ServerApiVersion } from "mongodb";

const { MONGODB_URI, MONGODB_DATABASE } = process.env;

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db().command({ ping: 1 });
  console.log("Connected to MongoDB!");
} catch (err) {
  console.error(err);
}

export const db = client.db(MONGODB_DATABASE);
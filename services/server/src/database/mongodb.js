import { MongoClient, ObjectId } from "mongodb";
import { dataBase } from "../config/config";

export const options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 70000,
  family: 4,
  maxPoolSize: 10,
  auth: {
    username: "root",
    password: "example",
  },
};

const DATABASE = dataBase.database;

const client = new MongoClient(dataBase.URI, options);

export let db;

export async function connectDb() {
  try {
    await client.connect(); // new connect caches the mongoDb. Will return cached one if exist.
    db = await client.db(DATABASE);
    console.log(`\n✅ CONNECTED TO [${DATABASE}]\n`);
    return db;
  } catch (err) {
    console.error(`\n⛔️ CONNECTION FAILED TO [${DATABASE}]`);
    throw err;
  }
}

export { ObjectId };

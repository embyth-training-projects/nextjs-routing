import { MongoClient } from "mongodb";

export async function connectDataBase() {
  const client = await MongoClient.connect(
    `mongodb+srv://Admin:vhhMArZrFNbzCWVR@cluster0.kz2sc.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort = -1) {
  const db = client.db();

  return await db.collection(collection).find().sort({ _id: sort }).toArray();
}

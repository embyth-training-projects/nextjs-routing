import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === `POST`) {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes(`@`)) {
      res.status(422).json({ message: `Invalid email address!` });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://Admin:vhhMArZrFNbzCWVR@cluster0.kz2sc.mongodb.net/events?retryWrites=true&w=majority`
    );
    const db = client.db();

    await db.collection(`newsletter`).insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: `Signed up!` });
  } else {
    res.status(405).json({ message: `Method Not Allowed` });
  }
}

export default handler;

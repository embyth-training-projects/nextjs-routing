import {
  connectDataBase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDataBase();
  } catch (error) {
    res.status(500).json({ message: `Connecting to db failed!` });
    return;
  }

  if (req.method === `POST`) {
    const { email, name, text } = req.body;

    if (
      !email.includes(`@`) ||
      !name ||
      name.trim(``) === `` ||
      !text ||
      text.trim(``) === ``
    ) {
      res.status(422).json({ message: `Invalid inputs!` });
      client.close();
      return;
    }

    const newComment = { email, name, text, eventId };

    let result;
    try {
      result = await insertDocument(client, `comments`, newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: `Comment added!`, comment: newComment });
    } catch (error) {
      res.status(500).json({ message: `Inserting comment failed!` });
    }
  }

  if (req.method === `GET`) {
    let documents;
    try {
      documents = await getAllDocuments(client, `comments`, -1);

      const eventComments = documents.filter(
        (comment) => comment.eventId === eventId
      );
      res.status(200).json({ comments: eventComments });
    } catch (error) {
      res.status(500).json({ message: `Getting comments failed!` });
    }
  }

  client.close();
}

export default handler;

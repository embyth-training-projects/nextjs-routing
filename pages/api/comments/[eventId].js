function handler(req, res) {
  const eventId = req.query.eventId;

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
      return;
    }

    const newComment = { id: new Date().toISOString(), email, name, text };
    console.log(newComment);
    res.status(201).json({ message: `Comment added!`, comment: newComment });
  }

  if (req.method === `GET`) {
    const dummyList = [
      { id: `c1`, name: `John`, text: `Text for first` },
      { id: `c2`, name: `Max`, text: `Text for second` },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;

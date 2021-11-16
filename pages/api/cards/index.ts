import type { NextApiRequest, NextApiResponse } from "next";
import { cardsMock } from "helpers/cards-mock";

export default handler;

function handler(req: NextApiRequest, res: NextApiResponse): void {
  switch (req.method) {
    case "GET":
      return getCards();
    case "POST":
      return createCard();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getCards() {
    const cards = cardsMock.getAll();
    return res.status(200).json(cards);
  }

  function createCard() {
    try {
      cardsMock.create(req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

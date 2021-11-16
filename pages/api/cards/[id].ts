import type { NextApiRequest, NextApiResponse } from "next";
import { cardsMock } from "helpers";

export default handler;

function handler(req: NextApiRequest, res: NextApiResponse): void {
  switch (req.method) {
    case "GET":
      return getCardById();
    case "PUT":
      return updateCard();
    case "DELETE":
      return deleteCard();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getCardById(): void {
    const card = cardsMock.getById(req.query.id);
    return res.status(200).json(card);
  }

  function updateCard() {
    try {
      cardsMock.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function deleteCard() {
    cardsMock.delete(req.query.id);
    return res.status(200).json({});
  }
}

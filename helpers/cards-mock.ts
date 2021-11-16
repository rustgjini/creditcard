import { CreditCardData } from "../components";
import { CardId } from "types/cardId";

const fs = require("fs");

let cards: CreditCardData[] = require("cards.json");

export const cardsMock = {
  getAll,
  getById,
  create: createRecord,
  update: updateRecord,
  delete: deleteRecord
};

function getAll(): CreditCardData[] {
  return cards;
}

function getById(id: CardId): CreditCardData {
  return cards.find((x) => x.id.toString() === id.toString());
}

function createRecord(data: Partial<CreditCardData>): void {
  if (cards.find((x) => x.cardNumber === data.cardNumber))
    throw `Card number already registered`;

  data.id = cards.length ? Math.max(...cards.map((x) => x.id)) + 1 : 1;
  cards.push(<CreditCardData>data);
  saveToFileSystem();
}

function updateRecord(id: CardId, data: Partial<CreditCardData>): void {
  const params = data;
  const card = cards.find((x) => x.id.toString() === id.toString());

  Object.assign(card, params);
  saveToFileSystem();
}

function deleteRecord(id: CardId): void {
  cards = cards.filter((x) => x.id.toString() !== id.toString());
  saveToFileSystem();
}

function saveToFileSystem() {
  fs.writeFileSync("cards.json", JSON.stringify(cards, null, 4));
}

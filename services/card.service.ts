import { httpService } from ".";
import { CreditCardData } from "../components";

export const cardService = {
  getAll,
  create,
  update,
  delete: _delete
};

const baseUrl = `http://localhost:3000/api/cards`;

function getAll(): Promise<Response> {
  return httpService.get(baseUrl);
}

function create(data: CreditCardData): Promise<Response> {
  return httpService.post(baseUrl, data);
}

function update(
  id: number,
  params: Partial<CreditCardData>
): Promise<Response> {
  return httpService.put(`${baseUrl}/${id}`, params);
}

function _delete(id: number): Promise<Response> {
  return httpService.delete(`${baseUrl}/${id}`);
}

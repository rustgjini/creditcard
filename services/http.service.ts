export const httpService = {
  get,
  post,
  put,
  delete: _delete
};

function get(url: string): Promise<Response> {
  const requestOptions = {
    method: "GET"
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: Record<string, any>): Promise<Response> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: Record<string, any>): Promise<Response> {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url: string): Promise<Response> {
  const requestOptions = {
    method: "DELETE"
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response: Response) {
  return response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

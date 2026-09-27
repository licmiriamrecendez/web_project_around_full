const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Error: ${response.status}`);
}

export function signin(data: {
  email: string;
  password: string;
}): Promise<{
  token: string;
}> {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) =>
    checkResponse<{
      token: string;
    }>(response),
  );
}

export function signup(data: {
  email: string;
  password: string;
}) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => checkResponse(response));
}

export function checkToken(token: string): Promise<{
  data: {
    _id: string;
    email: string;
  };
}> {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) =>
    checkResponse<{
      data: {
        _id: string;
        email: string;
      };
    }>(response),
  );
}
const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";
  
type AuthUser = {
  _id: string;
  email: string;
  name: string;
  about: string;
  avatar: string;
};

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Error: ${response.status}`);
}

// Iniciar sesión
export function signin(data: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  user: AuthUser;
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
      user: AuthUser;
    }>(response)
  );
}

// Registrar usuario
export function signup(data: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) =>
    checkResponse<AuthUser>(response)
  );
}

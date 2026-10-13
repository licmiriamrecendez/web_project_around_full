import type {
  UserData,
  CardData,
  UserFormData,
  AvatarFormData,
  CardFormData,
} from "../types/types";

type ApiOptions = {
  baseUrl: string;
  headers: {
    "Content-Type": string;
  };
};

class Api {
  private _baseUrl: string;
  private _headers: ApiOptions["headers"];

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  
private _getHeaders(): HeadersInit {
  const token = localStorage.getItem("token");

  return {
    ...this._headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}


  private async _checkResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json() as Promise<T>;
    }

    const errorText = await response.text();

    throw new Error(
      `Error ${response.status}: ${errorText || response.statusText}`
    );
  }

  getUserInfo(): Promise<UserData> {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then((response) => this._checkResponse<UserData>(response));
  }

  getInitialCards(): Promise<CardData[]> {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then((response) => this._checkResponse<CardData[]>(response));
  }

  updateUserInfo(data: UserFormData): Promise<UserData> {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then((response) => this._checkResponse<UserData>(response));
  }

  updateAvatar(data: AvatarFormData): Promise<UserData> {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then((response) => this._checkResponse<UserData>(response));
  }

  addCard(data: CardFormData): Promise<CardData> {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then((response) => this._checkResponse<CardData>(response));
  }

  deleteCard(cardId: string): Promise<void> {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((response) => this._checkResponse<void>(response));
  }

  addLike(cardId: string): Promise<CardData> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then((response) => this._checkResponse<CardData>(response));
  }

  removeLike(cardId: string): Promise<CardData> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((response) => this._checkResponse<CardData>(response));
  }
}


const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const api = new Api({
  baseUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
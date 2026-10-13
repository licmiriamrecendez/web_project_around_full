import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";

import api from "../utils/api";
import { signup, signin } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

import type {
  UserData,
  CardData,
  UserFormData,
  AvatarFormData,
  CardFormData,
  PopupConfig,
} from "../types/types";

function App(): React.JSX.Element {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
  Boolean(localStorage.getItem("token"))
);
const [isCheckingToken, setIsCheckingToken] = useState(
  Boolean(localStorage.getItem("token"))
);
const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);

 // RECUPERAR SESIÓN Y CARGAR DATOS
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsCheckingToken(false);
      return;
    }

    const loadInitialData = async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);

        setCurrentUser(userData);
        setCards(initialCards);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error al recuperar la sesión:", error);

        localStorage.removeItem("token");
        setCurrentUser(null);
        setCards([]);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    loadInitialData();
  }, []);

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  function handleCloseInfoTooltip(): void {
  setIsInfoTooltipOpen(false);
}

  async function handleRegister(
  email: string,
  password: string
): Promise<void> {
  try {
    await signup({
      email,
      password,
    });

    setInfoTooltipMessage("¡Correcto! Ya estás registrado.");
    setIsInfoTooltipSuccess(true);
    setIsInfoTooltipOpen(true);
    navigate("/signin");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    handleRegisterError();
  }
}

function handleRegisterError(): void {
  setInfoTooltipMessage(
    "Uy, algo salió mal. Por favor, inténtalo de nuevo."
  );
  setIsInfoTooltipSuccess(false)
  setIsInfoTooltipOpen(true);
}

function handleLoginError(): void {
  setInfoTooltipMessage(
    "Uy, algo salió mal. Por favor, inténtalo de nuevo."
  );
  setIsInfoTooltipSuccess(false)
  setIsInfoTooltipOpen(true);
}

  // ACTUALIZAR USUARIO
  const handleUpdateUser = async (
    data: UserFormData
  ): Promise<void> => {
    try {
      const updatedUser = await api.updateUserInfo(data);

      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  // ACTUALIZAR AVATAR
  const handleUpdateAvatar = async (
    data: AvatarFormData
  ): Promise<void> => {
    try {
      const updatedUser = await api.updateAvatar(data);

      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    }
  };

  // CREAR TARJETA
  const handleAddPlaceSubmit = async (
    data: CardFormData
  ): Promise<void> => {
    try {
      const newCard = await api.addCard(data);

      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
    }
  };

  // LIKE
  const handleCardLike = async (
    card: CardData
  ): Promise<void> => {
    try {
      const newCard = card.isLiked
        ? await api.removeLike(card._id)
        : await api.addLike(card._id);

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id
            ? newCard
            : currentCard
        )
      );
    } catch (error) {
      console.error("Error al cambiar el like:", error);
    }
  };

  // BORRAR TARJETA
  const handleCardDelete = async (
    card: CardData
  ): Promise<void> => {
    try {
      await api.deleteCard(card._id);

      setCards((state) =>
        state.filter(
          (currentCard) => currentCard._id !== card._id
        )
      );
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  const handleLogin = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const data = await signin({
      email,
      password,
    });

    localStorage.setItem("token", data.token);

   
const userData = await api.getUserInfo();
const initialCards = await api.getInitialCards();

setCurrentUser(userData);
setCards(initialCards);


    setIsLoggedIn(true);
    navigate("/");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    handleLoginError();
  }
};

//borra el token y cambia la aplicación al estado de visitante

const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setCurrentUser(null);
  setCards([]);
  setPopup(null);
  navigate("/signin");
};


if (isCheckingToken) {
  return <></>;
}

return (
  <CurrentUserContext.Provider
    value={{
      currentUser,
      handleUpdateUser,
      handleUpdateAvatar,
      handleAddPlaceSubmit,
    }}
  >
    <Routes>
      <Route
  path="/"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <div className="page page__content">
        <Header
  isLoggedIn={isLoggedIn}
  email={currentUser?.email || ""}
  onLogout={handleLogout}
/>
        <Main
          cards={cards}
          popup={popup}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
        />
        <Footer />
      </div>
    </ProtectedRoute>
  }
/>

      <Route
  path="/signin"
  element={
    isLoggedIn ? (
      <Navigate to="/" replace />
    ) : (
      <div className="page page__content">
  <Header
    isLoggedIn={false}
    email=""
    onLogout={handleLogout}
    authLink="signup"
  />

  <Login
    onLogin={handleLogin}
  />
</div>
    )
  }
/>
     <Route
  path="/signup"
  element={
    isLoggedIn ? (
      <Navigate to="/" replace />
    ) : (
      <div className="page page__content">
  <Header
    isLoggedIn={false}
    email=""
    onLogout={handleLogout}
    authLink="signin"
  />

  <Register
    onRegister={handleRegister}
  
  />
</div>
    )
  }
/>
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>

    <InfoTooltip
  isOpen={isInfoTooltipOpen}
  message={infoTooltipMessage}
  isSuccess={isInfoTooltipSuccess}
  onClose={handleCloseInfoTooltip}
/>
  </CurrentUserContext.Provider>
);
}

export default App;
import { useEffect, useState } from "react";
import "./App.css";
import { HeaderContent } from "./components/header";
import { AdminPanel } from "./pages/AdminPanel";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { UserPage } from "./pages/UserPage";
import {
  AppShell,
  Header,
  MantineProvider,
  ColorSchemeProvider,
} from "@mantine/core";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserEmail } from "./redux/slices/userSlice";
import { CollectionPage } from "./pages/CollectionPage";
import { HomePage } from "./pages/HomePage";
import { useLocalStorage } from "@mantine/hooks";
import "./i18n";

function decodeToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.email;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const App = () => {
  const [auth, setAuth] = useState();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = decodeToken(token);
      dispatch(setUserEmail(email));
    } else {
      navigate(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth !== undefined) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== undefined) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          header={
            <Header>{<HeaderContent auth={auth} setAuth={setAuth} />}</Header>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/login" element={<Login setAuth={setAuth} />}></Route>
            <Route path="/home" element={<HomePage auth={auth} />}></Route>
            <Route path="/admin" element={<AdminPanel auth={auth} setAuth={setAuth} />}></Route>
            <Route
              path="/user"
              element={<UserPage auth={auth} setAuth={setAuth} />}
            ></Route>
            <Route path="/collection">
              <Route path=":id" element={<CollectionPage />}></Route>
            </Route>
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;

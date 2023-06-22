import { useEffect, useState } from "react";
import "./App.css";
import { HeaderContent } from "./components/header";
import { AdminPanel } from "./pages/AdminPanel";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { UserPage } from "./pages/UserPage";
import { AppShell, Header, MantineProvider } from "@mantine/core";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkAuth } from "./api/checkAuth";
import { logoutUser } from "./api/logout";

function App() {
  const [auth, setAuth] = useState();
  const navigate = useNavigate();
  const check = async () => {
    try {
      const response = await checkAuth();
      if (response.status === 500) {
        navigate(`/`);
      }
    } catch (e) {
      navigate(`/`);
      setAuth(false);
      logoutUser();
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      check();
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
    <MantineProvider>
      <AppShell
        header={
          <Header>{<HeaderContent auth={auth} setAuth={setAuth} />}</Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: "#f7f7f8" },
        })}
      >
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login setAuth={setAuth} />}></Route>
          <Route path="/home"></Route>
          <Route path="/adminPanel" element={<AdminPanel />}></Route>
          <Route
            path="/user"
            element={<UserPage auth={auth} setAuth={setAuth} />}
          ></Route>
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

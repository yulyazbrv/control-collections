import { Flex, Input, PasswordInput, Button, Title } from "@mantine/core";
import { useState } from "react";
import { IconAt } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../redux/slices/userSlice";
import { loginUser } from "../../api/authApi/login";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const { setAuth } = props;
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const loginClick = async () => {
    try {
      await loginUser(email, password);
      setAuth(true);
      dispatch(setUserEmail(email))
      navigate(`/home`, {replace: true});
    } catch (e) {
      setResult(e.message);
    }
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Flex direction={"column"} gap={10} justify={"center"} w={400} h={500}>
        <Title order={2}>{t("login")}</Title>
        <Input
          icon={<IconAt width={17} height={17} />}
          placeholder={t("your email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <PasswordInput
          placeholder={t("password")}
          withAsterisk
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="red" radius="lg" uppercase onClick={loginClick}>
          {t("sign in")}
        </Button>
        <Title order={6}>{result}</Title>
      </Flex>
    </Flex>
  );
};

export { Login };

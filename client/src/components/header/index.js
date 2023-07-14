import { Flex, Input, Select } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./style.css";
import { IconSearch } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SearchArea } from "../searchArea";
import { SearchModal } from "./components/searchModal";
import { useAdmin } from "../../core/useAdmin";
import { useSelector } from "react-redux";

const HeaderContent = (props) => {
  const { t, i18n } = useTranslation();
  const { auth } = props;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [language, setLanguage] = useState(i18n.language);
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);

  const dark = colorScheme === "dark";

  const email = useSelector((state) => state.user.email) || "";
  const { data: isAdmin } = useAdmin(email);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Flex direction={"column"}>
      <Flex align={"center"} mih={50} justify={"center"}>
        <Flex gap={30} align={"center"}>
          <Link
            to="/home"
            className={classNames("link", pathname === "/home" && "active")}
          >
            {t("home")}
          </Link>
          {isAdmin ? (
            <Link
              to="/admin"
              className={classNames("link", pathname === "/admin" && "active")}
            >
              {t("admin")}
            </Link>
          ) : (
            <Link
              to="/user"
              className={classNames("link", pathname === "/user" && "active")}
            >
              {t("user")}
            </Link>
          )}

          {auth ? (
            <></>
          ) : (
            <>
              <Link
                to="/registration"
                className={classNames(
                  "link",
                  pathname === "/registration" && "active"
                )}
              >
                {t("sign up")}
              </Link>

              <Link
                to="/login"
                className={classNames(
                  "link",
                  pathname === "/login" && "active"
                )}
              >
                {t("sign in")}
              </Link>
            </>
          )}
          <IconSearch onClick={() => setOpened(true)}></IconSearch>
          <Select
            w={"90px"}
            radius="lg"
            size={"xs"}
            value={language}
            onChange={setLanguage}
            data={[
              { value: "en", label: "English" },
              { value: "pl", label: "Polish" },
            ]}
          ></Select>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "red"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
          <SearchModal opened={opened} setOpened={setOpened}></SearchModal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { HeaderContent };

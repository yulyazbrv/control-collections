import { Flex } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchModal } from "./components/searchModal";
import { useAdmin } from "../../core/useAdmin";
import { useSelector } from "react-redux";
import "./style.css";

const HeaderContent = (props) => {
  const { t } = useTranslation();
  const { auth } = props;
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);

  const email = useSelector((state) => state.user.email) || "";
  const { data: isAdmin } = useAdmin(email);

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
          <SearchModal opened={opened} setOpened={setOpened}></SearchModal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { HeaderContent };

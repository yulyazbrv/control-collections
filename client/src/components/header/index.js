import { Flex, Input } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./style.css";
import { IconSearch } from "@tabler/icons-react";

const HeaderContent = (props) => {
  const { auth } = props;
  const { pathname } = useLocation();
  return (
    <Flex align={"center"} mih={50} justify={"center"}>
      <Flex gap={60} align={"center"}>
        <Link
          to="/home"
          className={classNames("link", pathname === "/home" && "active")}
        >
          HOME
        </Link>
        <Link
          to="/user"
          className={classNames("link", pathname === "/user" && "active")}
        >
          USER
        </Link>
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          radius="lg"
          variant="filled"
        />
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
              SIGN UP
            </Link>

            <Link
              to="/login"
              className={classNames("link", pathname === "/login" && "active")}
            >
              SIGN IN
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export { HeaderContent };

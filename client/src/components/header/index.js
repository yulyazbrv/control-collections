import { Flex, Input } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./style.css";
import { IconSearch } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const HeaderContent = (props) => {
  const { auth } = props;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { pathname } = useLocation();
  const dark = colorScheme === 'dark';

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
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "red"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export { HeaderContent };

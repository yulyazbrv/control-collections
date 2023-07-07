import { Flex, Input, Select } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./style.css";
import { IconSearch } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation  } from "react-i18next";

const HeaderContent = (props) => {
  const { t, i18n } = useTranslation();
  const { auth } = props;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [language, setLanguage] = useState(i18n.language)
  const { pathname } = useLocation();
  const dark = colorScheme === "dark";

  useEffect(() => {
    i18n.changeLanguage(language)
  },[language])

  return (
    <Flex align={"center"} mih={50} justify={"center"}>
      <Flex gap={30} align={"center"}>
        <Link
          to="/home"
          className={classNames("link", pathname === "/home" && "active")}
        >
          {t('home')}
        </Link>
        <Link
          to="/user"
          className={classNames("link", pathname === "/user" && "active")}
        >
          {t('user')}
        </Link>
        
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
              className={classNames("link", pathname === "/login" && "active")}
            >
             {t("sign in")}
            </Link>
          </>
        )}
        
        <Input
          icon={<IconSearch />}
          placeholder={t('search')}
          radius="lg"
          variant="filled"
          size={"xs"}
        />
        <Select
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
      </Flex>
    </Flex>
  );
};

export { HeaderContent };

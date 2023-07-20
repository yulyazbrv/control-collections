import {
  Button,
  Flex,
  Image,
  LoadingOverlay,
  Table,
  Title,
} from "@mantine/core";
import { useUsers } from "../../core/useUsers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCollections } from "../../core/useCollections";
import { Collection } from "../../components/collection";
import { blockUser } from "../../api/userApi/blockUser";
import { unblockUser } from "../../api/userApi/unblockUser";
import { deleteUser } from "../../api/userApi/deleteUser";
import { IconLogout } from "@tabler/icons-react";
import { logoutUser } from "../../api/authApi/logout";
import { addAdmin } from "../../api/userApi/addAdmin";
import { deleteAdmin } from "../../api/userApi/deleteAdmin";
import emptyIcon from "./assets/preview.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useAdmin } from "../../core/useAdmin";

const AdminPanel = (props) => {
  const { setAuth, auth } = props;
  const { t } = useTranslation();
  const { data: users, isFetching: isLoading, refetch } = useUsers();
  const email = useSelector((state) => state.user.email);
  const [selectedEmail, setSelectedEmail] = useState([]);
  const { data: collections, isFetching: isLoadingCollectons } =
    useCollections();
  const navigate = useNavigate();
  const { data: isAdmin } = useAdmin(email);

  useEffect(() => {
    if (!isAdmin) {
      logoutUser();
      setAuth(false);
    }
  }, [isAdmin, setAuth]);

  const handleCheckboxChange = (email) => {
    if (selectedEmail.includes(email)) {
      setSelectedEmail(
        selectedEmail.filter((selectedEmail) => selectedEmail !== email)
      );
    } else {
      setSelectedEmail([...selectedEmail, email]);
    }
  };

  const selectAll = () => {
    const allIds = users.map((user) => user.email);
    setSelectedEmail(allIds);
  };

  const clearSelection = () => {
    setSelectedEmail([]);
  };

  const blockClick = async () => {
    await blockUser(selectedEmail);
    setSelectedEmail([]);
    refetch();
  };

  const unblockClick = async () => {
    await unblockUser(selectedEmail);
    setSelectedEmail([]);
    refetch();
  };

  const removeClick = async () => {
    await deleteUser(selectedEmail);
    setSelectedEmail([]);
    refetch();
  };

  const addAdminClick = async () => {
    await addAdmin(selectedEmail);
    setSelectedEmail([]);
    refetch();
  };

  const removeAdminClick = async () => {
    await deleteAdmin(selectedEmail);
    setSelectedEmail([]);
    refetch();
  };

  const loginClick = () => {
    navigate(`/login`, { replace: true });
  };

  const rows = users
    ? users.map((user) => (
        <tr key={user._id}>
          <td>
            <input
              type="checkbox"
              checked={selectedEmail.includes(user.email)}
              onChange={() => handleCheckboxChange(user.email)}
            ></input>
          </td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin.toString()}</td>
          <td>{user.status}</td>
        </tr>
      ))
    : [];

  return (
    <Flex direction={"column"} align={"center"}>
      {auth ? (
        <Flex mt={70} direction={"column"} gap={40} w={"100%"} maw={900}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Flex
            justify={"space-between"}
            align={"center"}
            wrap={"wrap"}
            gap={5}
          >
            <Flex direction={"column"} gap={5}>
              <Flex align={"center"} gap={10}>
                <Title order={3}>
                  {t("Hello")}, {email}
                </Title>
                <IconLogout
                  onClick={() => {
                    logoutUser();
                    setAuth(false);
                  }}
                ></IconLogout>
              </Flex>
              <Flex gap={5}>
                <Button color="red" radius="lg" onClick={addAdminClick}>
                  {t("add to admins")}
                </Button>
                <Button color="red" radius="lg" onClick={removeAdminClick}>
                  {t("remove from admins")}
                </Button>
              </Flex>
            </Flex>
            <Flex gap={5} direction={"column"}>
              <Flex gap={5}>
                <Button color="red" radius="lg" onClick={selectAll}>
                  {t("select all")}
                </Button>
                <Button color="red" radius="lg" onClick={clearSelection}>
                  {t("remove select")}
                </Button>
              </Flex>
              <Flex gap={5}>
                <Button color="red" radius="lg" onClick={blockClick}>
                  {t("block")}
                </Button>
                <Button color="red" radius="lg" onClick={unblockClick}>
                  {t("unblock")}
                </Button>
                <Button color="red" radius="lg" onClick={removeClick}>
                  {t("delete")}
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Table highlightOnHover withBorder>
            <thead>
              <tr>
                <th></th>
                <th>name</th>
                <th>email</th>
                <th>is admin</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Flex direction={"column"} align={"center"} justify={"center"}>
            <Flex direction={"column"} w={"100%"} align={"center"}>
              <LoadingOverlay visible={isLoadingCollectons} overlayBlur={5} />
              {collections ? (
                collections.map((collection, index) => (
                  <Collection
                    key={index}
                    collection={collection}
                    email={email}
                    auth={auth}
                  ></Collection>
                ))
              ) : (
                <Flex>{/* <Image src={emptyIcon} alt="empty"></Image> */}</Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex direction={"column"} w={"100%"} maw={300} mt={110}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Image
            alt="nothing"
            radius={20}
            src={emptyIcon}
            className="empty-img"
          ></Image>
          <Button color="red" radius="lg" onClick={loginClick}>
            {t("sign in")}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export { AdminPanel };

import {
  Avatar,
  Button,
  Flex,
  Image,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { useUserCollections } from "../../core/useUserCollections";
import emptyIcon from "./assets/nothing.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconLogout } from "@tabler/icons-react";
import { logoutUser } from "../../api/authApi/logout";
import { useDisclosure } from "@mantine/hooks";
import { CreateCollection } from "../../components/createCollection";
import { Collection } from "../../components/collection";

const UserPage = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { auth, setAuth } = props;
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const { data: collections, isFetching: isLoading, refetch } =
    useUserCollections(email);

  const loginClick = () => {
    navigate(`/login`, { replace: true });
  };

  return (
    <Flex direction={"column"}>
      <LoadingOverlay visible={isLoading} overlayBlur={5} />
      <CreateCollection close={close} opened={opened} refetch={refetch}></CreateCollection>
      {auth ? (
        <Flex direction={"column"} gap={20} mt={60} align={"center"} w={"100%"}>
          <Flex
            direction={"row"}
            justify={"space-between"}
            w={"100%"}
            maw={900}
          >
            <Flex direction={"row"} gap={5}>
              <Button onClick={open} color="red" radius="lg" uppercase>
                Create
              </Button>
              <Button color="red" radius="lg" uppercase>
                Delete
              </Button>
            </Flex>
            <Flex direction={"row"} gap={5} align={"center"}>
              <Title order={4}>{email}</Title>
              <Avatar radius="xl" />
              <IconLogout
                onClick={() => {
                  logoutUser();
                  setAuth(false);
                }}
              ></IconLogout>
            </Flex>
          </Flex>
          <Flex direction={"column"} align={"center"} w={"100%"}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            {collections
              ? collections.map((collection, index) => (
                  <Collection
                    key={index}
                    collection={collection}
                    email={email}
                    refetch={refetch}
                  ></Collection>
                ))
              : []}
          </Flex>
        </Flex>
      ) : (
        <Flex direction={"column"} w={"250px"} mt={110}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />

          <Image alt="nothing" src={emptyIcon} className="empty-img"></Image>
          <Button color="red" radius="lg" uppercase onClick={loginClick}>
            SIGN IN
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export { UserPage };

import {
  Avatar,
  Button,
  Card,
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

const UserPage = (props) => {
  const { auth } = props;
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const { data: collections, isFetching: isLoading } =
    useUserCollections(email);

  const loginClick = () => {
    navigate(`login`);
  };
  return (
    <Flex direction={"column"} gap={20} align={"center"} mt={50}>
      {auth ? (
        <>
          <Flex direction={"row"} align={"center"} justify={"space-between"}>
            <Flex direction={"row"} gap={5}>
              <Button color="red" radius="lg" uppercase>
                Create
              </Button>
              <Button color="red" radius="lg" uppercase>
                Update
              </Button>
              <Button color="red" radius="lg" uppercase>
                Delete
              </Button>
            </Flex>
            <Flex direction={"row"} gap={5}>
              <Title>{email}</Title>
              <Avatar radius="xl" />
              <IconLogout></IconLogout>
            </Flex>
          </Flex>
          <Flex>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Flex>
                <Flex>
                  <Image></Image>
                </Flex>
                <Flex direction={"column"} gap={5} justify={"center"}>
                  {collections
                    ? collections.map((collection) => (
                        <>
                          <Title order={5}>{collection.name}</Title>
                          <Title order={4}>{collection.description}</Title>
                          <Title order={3}>{collection.theme}</Title>
                        </>
                      ))
                    : []}
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </>
      ) : (
        <Flex direction={"column"}>
          <Image alt="nothing" src={emptyIcon}></Image>
          <Button color="red" radius="lg" uppercase onClick={loginClick}>
            SIGN IN
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export { UserPage };

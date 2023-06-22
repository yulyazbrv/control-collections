import { Button, Flex, LoadingOverlay, Table, Title } from "@mantine/core";
import { useUsers } from "../../core/useUsers";
import { useState } from "react";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const { data: users, isFetching: isLoading } = useUsers();
  const email = useSelector((state) => state.user.email)
  const [selectedEmail, setSelectedEmail] = useState([]);
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
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin}</td>
          <td>{user.status}</td>
        </tr>
      ))
    : [];

  return (
    <Flex mt={80} direction={"column"} gap={30}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex justify={"space-between"}>
        <Flex>
          <Title order={3}>Hello, {email}</Title>
        </Flex>
        <Flex gap={5}>
          <Button color="red" radius="lg" uppercase onClick={selectAll}>
            Select All
          </Button>
          <Button color="red" radius="lg" uppercase onClick={clearSelection}>
            Remove select
          </Button>
          <Button color="red" radius="lg" uppercase>
            Block
          </Button>
          <Button color="red" radius="lg" uppercase>
            Unblock
          </Button>
          <Button color="red" radius="lg" uppercase>
            Delete
          </Button>
          <Button color="red" radius="lg" uppercase>
            Add to admins
          </Button>
          <Button color="red" radius="lg" uppercase>
            Remove from admins
          </Button>
        </Flex>
      </Flex>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>is admin</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Flex>
  );
};

export { AdminPanel };

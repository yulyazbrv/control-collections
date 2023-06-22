import { Button, Flex, Input, PasswordInput, Title } from "@mantine/core";
import { useState } from "react";
import { IconAt } from "@tabler/icons-react";
import { registrateUser } from "../../api/registration";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const registrationClick = async () => {
    try {
      await registrateUser(name, email, password);
      setName("");
      setEmail("");
      setPassword("");
      setResult("Succesfully");
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Flex direction={"column"} gap={10} justify={"center"} w={400} h={500}>
        <Title order={2}>Registration</Title>
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          icon={<IconAt width={17} height={17} />}
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          withAsterisk
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="red" radius="lg" uppercase onClick={registrationClick}>
          Sign up
        </Button>
        <Title order={6}>{result}</Title>
      </Flex>
    </Flex>
  );
};

export { Registration };

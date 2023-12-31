import { useRouter } from "next/router";
import { useState } from "react";

import { Button, Card, Group, Input, PasswordInput, Text } from "@mantine/core";

import { IconAt, IconLock } from "@tabler/icons-react";

import { postLogin } from "@/helpers/auth";
import { user_input_zod_schema } from "@/types/common.types";
import { ErrorNotification } from "@/utils/notification";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }
  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  async function onLogin() {
    try {
      const valid = user_input_zod_schema.safeParse({
        username: email,
        password: password
      });

      if (valid.success) {
        const loginResponse = await postLogin(email, password);
        if (loginResponse.success === true) {
          router.push("/user/dashboard");
        }
      } else {
        ErrorNotification(valid.error.message);
      }
    } catch (err: any) {
      console.log(err);
      ErrorNotification(err.response.data.message);
    }
  }

  return (
    <Card
      withBorder
      shadow="md"
      radius="md"
      className="xs:w-[90vw] md:w-[30vw] mx-auto my-[20vh]"
    >
      <Card.Section withBorder inheritPadding py={4} my={20}>
        <Text size={20} fw={700} color="teal">
          Login to
          <strong className="text-black"> user </strong>
          dashboard
        </Text>
      </Card.Section>
      <Input.Wrapper withAsterisk label="Username" onChange={handleEmail}>
        <Input id="input-email" icon={<IconAt />} placeholder="Your username" />
      </Input.Wrapper>
      <br />
      <PasswordInput
        id="input-password"
        placeholder="Password..."
        label="Password"
        icon={<IconLock size="1rem" />}
        withAsterisk
        onChange={handlePassword}
        className=""
      />
      <Group position="center" className="my-4 mt-7">
        <Button onClick={onLogin} variant="outline" color="teal">
          Login
        </Button>
      </Group>
      <Group>
        <Text size={"sm"} className="ml-auto">
          New here?{" "}
          <Button
            variant="light"
            compact
            onClick={() => router.push("/user/signup")}
          >
            Register
          </Button>
        </Text>
      </Group>
    </Card>
  );
}

export default Login;

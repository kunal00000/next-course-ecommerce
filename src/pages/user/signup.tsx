import { useRouter } from "next/router";
import { useState } from "react";

import { Button, Card, Group, Input, PasswordInput, Text } from "@mantine/core";

import { IconAt, IconLock } from "@tabler/icons-react";

import { postSignup } from "@/helpers/auth";
import { admin_input_zod_schema } from "@/types/admin.types";
import { ErrorNotification } from "@/utils/notification";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }
  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  async function onSignup() {
    try {
      const valid = admin_input_zod_schema.safeParse({
        username: email,
        password: password
      });

      if (valid.success) {
        const signupResponse = await postSignup(email, password);
        if (signupResponse.success === true) {
          router.push("/user/dashboard");
        }
      } else {
        ErrorNotification(valid.error.message);
      }
    } catch (err: any) {
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
          Register as
          <strong className="text-black"> user</strong>
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
        <Button onClick={onSignup} variant="outline" color="teal">
          Sign up
        </Button>
      </Group>
      <Group>
        <Text size={"sm"} className="ml-auto">
          Already a user?
          <Button
            variant="light"
            compact
            onClick={() => router.push("/user/login")}
          >
            Login
          </Button>
        </Text>
      </Group>
    </Card>
  );
}

export default Register;

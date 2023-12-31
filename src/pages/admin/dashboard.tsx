import Link from "next/link";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { AppShell, Navbar, Text } from "@mantine/core";

import { IconSquareRoundedPlus } from "@tabler/icons-react";

import Overview from "@/components/overview/Overview";
import { MainLinks, Redirect } from "@/components/utilComponents/Redirect";
import { User } from "@/components/utilComponents/User";
import { getUsername } from "@/helpers/auth";
import { userState } from "@/store/atoms/user";
import { userroleState } from "@/store/selectors/userEmail";

function Dashboard() {
  const setUsername = useSetRecoilState(userState);
  const role = useRecoilValue(userroleState);

  useEffect(() => {
    getUsername()
      .then((data) => {
        setUsername({
          isLoading: false,
          username: data.username,
          role: data.role
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AppShell
        layout="alt"
        padding="md"
        navbar={
          <Navbar
            width={{ base: 280 }}
            height={"98vh"}
            p="xs"
            m={"sm"}
            className="rounded-xl shadow-lg"
          >
            <Navbar.Section mb={36}>
              <Text className="text-2xl font-bold">CourseHub-Admin</Text>
            </Navbar.Section>
            <Navbar.Section>
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <Link href={`/admin/dashboard/create`}>
                <Redirect
                  icon={<IconSquareRoundedPlus />}
                  color={"lime"}
                  label={"Create Course"}
                />
              </Link>
            </Navbar.Section>
            <Navbar.Section m={"auto"} mb={0}>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0]
          }
        })}
      >
        <Overview />
      </AppShell>
    </div>
  );
}

export default Dashboard;

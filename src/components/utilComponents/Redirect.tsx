import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";

import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";

import { IconBrandGoogleAnalytics, IconCertificate } from "@tabler/icons-react";

import { userroleState } from "@/store/selectors/userEmail";

interface RedirectProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

export const Redirect = ({ icon, color, label }: RedirectProps) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          color: "black",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.teal[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} size={"1.3rem"} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export function MainLinks() {
  const role = useRecoilValue(userroleState);

  return (
    <div>
      <Link href={`/${role}/dashboard`}>
        <Redirect
          icon={<IconBrandGoogleAnalytics />}
          color={"orange"}
          label={"Overview"}
        />
      </Link>
      <Link href={`/${role}/dashboard/courses`}>
        <Redirect
          icon={<IconCertificate />}
          color={"yellow"}
          label={"Courses"}
        />
      </Link>
    </div>
  );
}

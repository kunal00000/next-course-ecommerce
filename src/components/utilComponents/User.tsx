import { logoutModal } from "./LogoutModal";
import { useRecoilValue } from "recoil";

import {
  Box,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme
} from "@mantine/core";

import {
  IconChevronLeft,
  IconChevronRight,
  IconUserCircle
} from "@tabler/icons-react";

import { usernameState } from "@/store/selectors/userEmail";

export function User() {
  const theme = useMantineTheme();

  const username = useRecoilValue(usernameState);

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`
      }}
    >
      <UnstyledButton
        onClick={() => logoutModal()}
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.teal[0]
          }
        }}
      >
        <Group>
          <ThemeIcon
            color={"blue"}
            size={"2.1rem"}
            radius={"xl"}
            variant="light"
          >
            <IconUserCircle />
          </ThemeIcon>
          <Box w={"9rem"}>
            <Text size="sm" ml={"-xs"} weight={500}>
              @{username}
            </Text>
          </Box>

          {theme.dir === "ltr" ? (
            <IconChevronRight size={rem(18)} />
          ) : (
            <IconChevronLeft size={rem(18)} />
          )}
        </Group>
      </UnstyledButton>
    </Box>
  );
}

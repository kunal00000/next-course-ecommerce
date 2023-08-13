import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{ fontFamily: "Verdana, sans-serif" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <Notifications limit={5} />
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  );
}

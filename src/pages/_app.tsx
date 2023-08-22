import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

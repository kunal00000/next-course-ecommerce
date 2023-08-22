import { atom } from "recoil";

export const userState = atom<{
  isLoading: boolean;
  username: string;
}>({
  key: "userState",
  default: {
    isLoading: true,
    username: ""
  }
});

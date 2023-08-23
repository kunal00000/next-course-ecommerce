import { atom } from "recoil";

export const userState = atom<{
  isLoading: boolean;
  username: string;
  role: "admin" | "user" | null;
}>({
  key: "userState",
  default: {
    isLoading: true,
    username: "",
    role: null
  }
});

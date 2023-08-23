import axiosClient from "@/helpers/axiosClient";
import { ErrorNotification, SuccessNotification } from "@/utils/notification";

export const postSignup = async (email: string, password: string) => {
  const { data } = await axiosClient.post("/api/admin/signup", {
    username: email,
    password: password
  });

  if (data.success === true) {
    console.log("signup success");
    SuccessNotification(data.message);
  } else {
    console.log("signup error");
    ErrorNotification(data.message);
    console.log(data);
  }
  return data;
};

export const postLogin = async (email: string, password: string) => {
  const { data } = await axiosClient.post(
    "/api/admin/login",
    {},
    {
      headers: {
        username: email,
        password: password
      }
    }
  );
  if (data.success === true) {
    console.log("login success");
    SuccessNotification(data.message);
  }
  return data;
};

export const getUsername = async () => {
  const { data } = await axiosClient.get("api/me");
  if (data.success == true) {
    return data.username;
  } else {
    return data.message;
  }
};

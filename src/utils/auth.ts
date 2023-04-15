import Cookies from "js-cookie";
import router from "../router";
import store from "../store";
const TokenKey = "Admin-Token";
const expiresKey = "Token-Expires";
const refreshTimmer = 1000 * 60 * 60 * 24;

export const getToken = () => {
  const expires = Number(Cookies.get(expiresKey)) - refreshTimmer;
  if (new Date().getTime() > expires) {
    // 刷新(暂时退出处理)
    store.dispatch("user/logout").then(() => {
      router.push({ path: "/login" });
    });
  } else {
    return Cookies.get(TokenKey);
  }
};

export const setToken = (token: string) => {
  Cookies.set(TokenKey, token, { expires: 7 });
  Cookies.set(
    expiresKey,
    String(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
    { expires: 7 }
  );
  return;
};

export const removeToken = () => {
  return Cookies.remove(TokenKey);
};

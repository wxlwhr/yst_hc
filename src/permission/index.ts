// 路由守卫
import router from "../router";
import store from "../store";
import { getToken } from "../utils/auth";
const whiteList = ["/login", "/findpassword","/orderDetails"];
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
        next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login`); 
    }
  }
});

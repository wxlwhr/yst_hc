import router from "../../router";
import Cookies from "js-cookie";
import { getToken, setToken, removeToken } from "../../utils/auth";
const state = () => ({
    // token: Cookies.get("Admin-Token"),
    userName: null,
})

const getters = {

}

const mutations = {
    SET_TOKEN: (state: any, token: string) => {
        state.token = token;
    },
    SET_USERNAME: (state: any, username: string) => {
        state.userName = username
    }
}

const actions = {
    LoginByUsername({ commit }: any, loginForm: any) {
        const userName = loginForm.username.trim()
        return new Promise((resolve, reject) => {
            // commit("SET_USERNAME", userName);
            //   loginApi(
            //      userName,
            //      loginForm.password,
            //   )
            //     .then((res) => {
            //       setToken(res.access_token);
            //       commit("SET_TOKEN", res.access_token);
            //       resolve(res);
            //     })
            //     .catch((error) => {
            //       reject(error);
            //     });
            if (loginForm.username && loginForm.password && loginForm.code) {
                setToken('110112');
                commit("SET_TOKEN", '110112');
                resolve({
                    msg: "登录成功"
                })
            }
        });
    },
    // 获取用户信息
    GetUserInfo({ commit }: any) {
        return new Promise((resolve, reject) => {
            

        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
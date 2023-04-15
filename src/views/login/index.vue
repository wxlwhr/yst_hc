<template>
    <div class="yst_login_container">
        <h2>玉生堂中医互联网养生馆</h2>
        <div class="yst_login_main">
            <div class="yst_login_main_top">
                欢 迎 登 录
            </div>
            <div class="yst_login_account_content">
                <el-form ref="formRef" :model="accountForm" label-width="auto" :rules="rules">
                    <el-form-item label="" prop="username">
                        <el-input v-model="accountForm.username" placeholder="账号/手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input v-model="accountForm.password" placeholder="密码" type="password"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="" class="yst_login_account_code" prop="code">
                        <el-input v-model="accountForm.code" placeholder="验证码">
                            <template #append>
                                <Identifying-code @getcode="getcode" ref="identifyingCode"></Identifying-code>
                            </template>
                        </el-input>
                    </el-form-item> -->
                    <el-form-item label="" class="yst_login_account_code" prop="code">
                        <el-input v-model="accountForm.code" placeholder="验证码">
                            <template #append>
                                <el-button>获取验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="yst_login_account_loginBtn">
                        <el-button @click="login(formRef)" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="yst_login_account_content_tools">
                    <div>
                        <el-checkbox v-model="passwordState">记住密码</el-checkbox>
                    </div>
                    <div @click="findpassword">忘记密码</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    name: "Login",
    setup() {
        const router = useRouter();
        const store = useStore();
        // 定义表单类型
        type FormInstance = InstanceType<typeof ElForm>;
        const formRef = ref<FormInstance>();
        const loading = ref(false);
        const accountForm = reactive({
            username: "",
            password: "",
            code: ""
        });
        const rules = reactive({
            username: [
                {
                    required: true,
                    message: "账号/手机号不能为空",
                    trigger: "blur",
                },
            ],
            password: [
                {
                    required: true,
                    message: "密码不能为空",
                    trigger: "blur",
                },
            ],
            code: [
                {
                    required: true,
                    message: "验证码不能为空",
                    trigger: "blur",
                },
            ],
        });

        // 验证码
        const getcode = () => {

        }
        // 登录
        const login = (formEl: FormInstance | undefined) => {
            loading.value = true;
            if (!formEl) return;
            formEl.validate((valid) => {
                if (valid) {
                    store.dispatch("user/LoginByUsername", accountForm).then((res) => {
                        console.log(res);

                        router.push("/home")
                    }).catch(() => {
                        loading.value = false;
                    })
                } else {
                    loading.value = false;
                    return false
                }
            })
            console.log(accountForm.username)

        }
        // 忘记密码
        const findpassword = () => {

        }
        // 记住密码
        const passwordState = () => {

        }


        return {
            // ...toRefs(accountForm),
            accountForm,
            rules,
            getcode,
            login,
            findpassword,
            passwordState,
            formRef,
            loading,
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/login/index.less";

.yst_login_account_content {
    padding-top: 20px;

    .yst_login_account_code {
        .el-button:hover {
            color: #FFFFFF;
            background: rgba(64, 158, 255, .7);
        }
    }

    .yst_login_account_loginBtn {
        .el-button {
            width: 100%;
            height: 46px;
            background: rgba(64, 158, 255, .7);
            border-radius: 23px;
            color: #fff;
            border-color: rgba(64, 158, 255, .7);
        }
    }

}
</style>
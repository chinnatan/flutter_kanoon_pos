// Utilities
import { firebaseAuth } from "@/plugins/firebaseClient";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { defineStore } from "pinia";
import router from "@/router";
import UserInfoModel from "@/model/user/user_info.model";
import ExceptionUtils from "@/utils/exception.utils";

export const useAuth = defineStore("auth", {
  state: () => ({
    userInfo: null as UserInfoModel | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.userInfo,
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  actions: {
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth, provider);

        if (!result) {
          throw new Error("Google login failed");
        }

        const accessToken = await result.user.getIdToken();

        if (!accessToken) {
          throw new Error("Failed to get access token");
        }

        this.userInfo = new UserInfoModel(
          result.user.email ?? "",
          result.user.displayName ?? "",
          result.user.photoURL ?? "",
          result.user.uid,
          accessToken,
          result.user.refreshToken
        );

        // ยิง api เพื่อเช็คว่าเคยเข้าสู่ระบบด้วย google หรือยัง
        router.push("/register");
      } catch (error) {
        console.error(error);
      }
    },
    register(
      email: string,
      fullname: string,
      image: string,
      storename: string,
      uuid: string,
      accessToken: string,
      refreshToken: string
    ) {
      try {
      } catch (error) {
        ExceptionUtils.getErrorMessage(error);
      }
    },
    logout() {
      this.userInfo = null;
    },
  },
});

<template>
  <v-main>
    <v-container class="mx-auto">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card
            title="สมัครสมาชิก"
            variant="outlined"
            class="bg-white"
            elevation="8"
          >
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      label="อีเมล์"
                      type="email"
                      variant="outlined"
                      density="compact"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-3">
                  <v-col>
                    <v-text-field
                      v-model="password"
                      label="รหัสผ่าน"
                      density="compact"
                      type="password"
                      variant="outlined"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-2">
                  <v-col>
                    <v-btn
                      type="submit"
                      color="primary"
                      block
                      :loading="isLoading"
                      >สมัครสมาชิก</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
              <v-row class="mt-2 mb-2">
                <v-col cols="12" md="6" class="mx-auto">
                  <v-divider>หรือ</v-divider>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-btn variant="outlined" to="/login" block
                    >เข้าสู่ระบบ</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import router from "@/router";
import firebaseAuth from "firebase/auth";
import firebase from "firebase/compat/app";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const emailRules = [
  (v: string) => !!v || "กรุณากรอกอีเมล์",
  (v: string) => /.+@.+\..+/.test(v) || "รูปแบบอีเมล์ไม่ถูกต้อง",
];
const passwordRules = [
  (v: string) => !!v || "กรุณากรอกรหัสผ่าน",
  (v: string) => v.length >= 6 || "รหัสผ่านต้องมีอย่างน้อย 6 ตัว",
];

const register = async () => {
  try {
    isLoading.value = true;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    console.log("สมัครสมาชิกสำเร็จ");
    isLoading.value = false;
    router.push("/login");
  } catch (error) {
    isLoading.value = false;
    alert((error as any).message);
  }
};
</script>

<style scoped>
.v-main {
  height: 100%;
  padding: 0px 0px 0px 0px;
  background: radial-gradient(circle, #90a0ac 0%, #1b6b9d 100%) !important;
}
.v-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <v-main>
    <v-container class="mx-auto">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card
            title="ข้อมูลเพิ่มเติม"
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
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="fullname"
                      label="ชื่อ - นามสกุล"
                      type="text"
                      variant="outlined"
                      density="compact"
                      :rules="fullnameRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-2">
                  <v-col>
                    <v-text-field
                      v-model="storename"
                      label="ชื่อร้านค้า"
                      density="compact"
                      type="text"
                      variant="outlined"
                      :rules="storenameRules"
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
                      >ยืนยัน</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import UserInfoModel from "@/model/user/user_info.model";
import router from "@/router";
import { useAuth } from "@/stores/auth";

const { getUserInfo } = useAuth();

const userInfo = getUserInfo as UserInfoModel;
if (!userInfo) {
  router.push("/");
}

const email = ref("");
const fullname = ref("");
const storename = ref("");

email.value = userInfo.email;
fullname.value = userInfo.fullname;

const isLoading = ref(false);
const fullnameRules = [(v: string) => !!v || "กรุณากรอกชื่อและนามสกุล"];
const storenameRules = [(v: string) => !!v || "กรุณากรอกชื่อร้านค้า"];

const register = async () => {
  try {
    // isLoading.value = true;
    // await useAuth.
    // console.log("สมัครสมาชิกสำเร็จ");
    // isLoading.value = false;
    // router.push("/login");
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

<template>
  <v-main>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="4" sm="12" class="mx-auto">
          <v-card variant="outlined" elevation="8" class="pa-5 mx-auto bg-white">
            <v-row>
              <v-col>
                <h3>เข้าสู่ระบบ</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field type="email" label="อีเมล์" variant="outlined" density="compact"></v-text-field>
                <v-text-field type="password" label="รหัสผ่าน" variant="outlined" density="compact"></v-text-field>
                <v-btn variant="outlined" block> เข้าสู่ระบบ </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12" class="mx-auto">
                <v-divider>หรือ</v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn variant="outlined" block @click="handleLogin">เข้าสู่ระบบด้วย Google</v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
              <v-col>
                <v-btn variant="outlined" block>สมัครสมาชิกด้วยอีเมล์</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

function handleLogin() {
  const dummyUserData = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  authStore.loginWithGoogle();
}

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
  align-items: center;
}
</style>

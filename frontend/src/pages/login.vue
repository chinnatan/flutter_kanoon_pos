<template>
  <v-main>
    <v-container class="mx-auto">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card
            title="เข้าสู่ระบบ"
            variant="outlined"
            class="bg-white"
            elevation="8"
          >
            <v-card-text>
              <v-form>
                <v-text-field
                  label="อีเมล์"
                  type="email"
                  variant="outlined"
                  density="compact"
                  required
                ></v-text-field>
                <v-text-field
                  label="รหัสผ่าน"
                  density="compact"
                  type="password"
                  variant="outlined"
                  required
                ></v-text-field>
                <v-btn color="primary" block>เข้าสู่ระบบ</v-btn>
                <v-row no-gutters class="mt-2">
                  <v-col>
                    <v-btn variant="outlined" color="primary" block
                      >เข้าสู่ระบบด้วย Google</v-btn
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
                  <v-btn variant="outlined" to="/register" block>สมัครสมาชิกด้วยอีเมล์</v-btn>
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
//
</script>

<style scoped>
.v-main {
  height: 100%;
  padding: 0px 0px 0px 0px;
  background: radial-gradient(circle, rgb(var(--v-theme-bg-primary-login-start)) 0%, rgb(var(--v-theme-bg-primary-login-end)) 100%) !important;
}
.v-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <v-main>
    <v-container class="mx-auto">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card
            title="Kanoon POS"
            variant="outlined"
            class="bg-white"
            elevation="8"
          >
            <v-card-text>
              <v-row no-gutters class="mt-2">
                <v-col>
                  <v-btn
                    variant="outlined"
                    color="primary"
                    block
                    @click="loginWithGoogle()"
                    >เข้าสู่ระบบด้วย Google</v-btn
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
import { useAuth } from "@/stores/auth";

const { loginWithGoogle } = useAuth();

</script>

<style scoped>
.v-main {
  height: 100%;
  padding: 0px 0px 0px 0px;
  background: radial-gradient(
    circle,
    rgb(var(--v-theme-bg-primary-login-start)) 0%,
    rgb(var(--v-theme-bg-primary-login-end)) 100%
  ) !important;
}
.v-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

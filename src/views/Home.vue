<template>
  <v-container>
    <h1 class="text-center">{{ $t("login") }}</h1>
    <v-alert v-if="error" dense dismissible type="error">{{ error }}</v-alert>
    <v-text-field v-model="email" :label="$t('mail')"></v-text-field>
    <v-text-field
      v-model="password"
      :type="'password'"
      :label="$t('password')"
    ></v-text-field>
    <v-btn
      color="primary"
      @keyup.enter="this.connection(email)"
      @click="connection(email)"
    >
      {{ $t("login") }}
    </v-btn>
  </v-container>
</template>

<script>
import { connection, getLudisByAccount } from "../apis/cirque";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
      connect: null,
      error: null,
    };
  },
  methods: {
    async connection(email) {
      this.error = null;
      if (this.email && this.password) {
        let connect = await connection(email);
        if (connect) {
          await getLudisByAccount(this.$store.state.id);
          this.$router.push("/game");
        } else {
          this.error = this.$t("wrongSignup");
        }
      } else {
        this.error = this.$t("errorSignup");
      }
    },
  },
};
</script>

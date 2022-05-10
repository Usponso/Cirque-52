<template>
  <div>
    <v-alert v-if="error" dense dismissible type="error">{{ error }}</v-alert>
    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-text-field
      v-model="password"
      :type="'password'"
      label="Mot de passe"
    ></v-text-field>
    <v-btn
      color="primary"
      @keyup.enter="this.connection(email)"
      @click="connection(email)"
    >
      Connexion
    </v-btn>
  </div>
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
          this.error = "Adresse email ou mot de passe incorrect";
        }
      } else {
        this.error =
          "Veuillez renseigner votre email ainsi que votre mot de passe";
      }
    },
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <div class="d-flex align-center">
        <p>Cirque 52</p>
      </div>

      <v-spacer></v-spacer>

      <v-btn text v-if="!this.$store.state.id"
        ><router-link to="/signup">Inscription</router-link></v-btn
      >
      <div v-else>
        <v-btn text>{{
          this.$store.state.laniste +
          " - " +
          this.$store.state.deniers +
          " deniers"
        }}</v-btn>
        <v-btn text @click="disconnect()"
          ><v-icon>mdi-logout</v-icon> Deconnexion</v-btn
        >
      </div>
    </v-app-bar>

    <v-main><router-view /></v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  mounted() {
    if (!this.$store.state.id) {
      this.$router.push("/");
    }
  },
  methods: {
    disconnect() {
      this.$store.commit("disconnect");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.v-application .v-app-bar a {
  color: white;
  text-decoration: none;
}
.v-main {
  margin-top: 40px;
}
</style>

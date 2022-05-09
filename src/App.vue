<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <p>Cirque 52</p>
      </div>

      <v-spacer></v-spacer>

      <v-btn text v-if="!this.$store.state.id"
        ><router-link to="/signup">Inscription</router-link></v-btn
      >
      <v-btn text v-else>{{
        this.$store.state.laniste +
        " - " +
        this.$store.state.deniers +
        " deniers"
      }}</v-btn>
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
};
</script>

<style>
.v-application .v-app-bar a {
  color: white;
  text-decoration: none;
}
</style>

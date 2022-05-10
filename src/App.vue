<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <div class="d-flex align-center">
        <p>{{ $t("app") }}</p>
      </div>

      <v-spacer></v-spacer>

      <v-btn text class="white--text" @click="changeLang">
        <v-icon>mdi-translate </v-icon>
        {{ $i18n.locale }}
      </v-btn>

      <v-btn text v-if="!this.$store.state.id"
        ><router-link to="/signup">{{ $t("signup") }}</router-link></v-btn
      >
      <div v-else>
        <v-btn text>{{
          this.$store.state.laniste +
          " - " +
          this.$store.state.deniers +
          " deniers"
        }}</v-btn>
        <v-btn text @click="disconnect()"
          ><v-icon>mdi-logout</v-icon> {{ $t("logout") }}</v-btn
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
    changeLang() {
      if (this.$i18n.locale === "fr") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "fr";
      }
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

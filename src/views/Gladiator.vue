<template>
  <v-container>
    <v-row>
      <v-btn @click="goBack()">
        <v-icon> mdi-chevron-left</v-icon> Retour
      </v-btn>
    </v-row>
    <br />
    <br />
    <v-row class="text-center">
      <br />
      <v-col md="4" cols="12" class="align-self-center">
        <v-img src="../assets/gladiator.png" />
        <br />
        <p>{{ "Spécialité du ludi :  " + specialiteLudi }}</p>
        <h1 class="text-uppercase">
          {{ gladiator.name }}
        </h1>
      </v-col>
      <v-col md="8">
        <v-row>
          <v-col md="4" cols="12">
            <v-card class="stat_card">
              <!-- Classe dynamique pour changer les couleurs en des cards en fonction du type principal -->
              <v-card-title class="justify-center text-uppercase title"
                >Adresse</v-card-title
              >
              <v-card-text class="text-center stat_value pa-4">
                {{ gladiator.adresse }}</v-card-text
              >
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="stat_card">
              <!-- Classe dynamique pour changer les couleurs en des cards en fonction du type principal -->
              <v-card-title class="justify-center text-uppercase title"
                >Force</v-card-title
              >
              <v-card-text class="text-center stat_value pa-4">
                {{ gladiator.force }}</v-card-text
              >
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="stat_card">
              <!-- Classe dynamique pour changer les couleurs en des cards en fonction du type principal -->
              <v-card-title class="justify-center text-uppercase title"
                >Equilibre</v-card-title
              >
              <v-card-text class="text-center stat_value pa-4">
                {{ gladiator.equilibre }}</v-card-text
              >
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="stat_card">
              <!-- Classe dynamique pour changer les couleurs en des cards en fonction du type principal -->
              <v-card-title class="justify-center text-uppercase title"
                >Vitesse</v-card-title
              >
              <v-card-text class="text-center stat_value pa-4">
                {{ gladiator.vitesse }}</v-card-text
              >
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="stat_card">
              <!-- Classe dynamique pour changer les couleurs en des cards en fonction du type principal -->
              <v-card-title class="justify-center text-uppercase title"
                >Strategie</v-card-title
              >
              <v-card-text class="text-center stat_value pa-4">
                {{ gladiator.strategie }}</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getGladiatorById, getSpecialiteByIdLudi } from "../apis/cirque";

export default {
  name: "Ludi",
  data() {
    return { specialiteLudi: "", gladiator: [] };
  },
  async mounted() {
    this.gladiator = await getGladiatorById(this.$route.params.id);
    this.specialiteLudi = await getSpecialiteByIdLudi(this.gladiator.ludiId);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.stat_card .title {
  background-color: red;
  font-weight: bold;
  color: white;
}
.stat_card .stat_value {
  font-size: 1.7em;
  font-weight: bold;
}
</style>

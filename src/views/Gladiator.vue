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
      <v-col cols="12"
        ><v-alert v-if="error" dense dismissible type="error">{{
          error
        }}</v-alert>
        <v-alert v-if="success" dense dismissible type="success">{{
          success
        }}</v-alert></v-col
      >

      <br />
      <v-col md="4" cols="12" class="align-self-center">
        <v-img src="../assets/gladiator.png" />
        <br />
        <p>{{ "Spécialité du ludi :  " + specialiteLudi }}</p>
        <h1 class="text-uppercase">
          {{ glad.name }}
        </h1>
      </v-col>
      <v-col md="8" class="align-self-center">
        <v-row>
          <v-col md="4" cols="12">
            <v-card class="stat_card">
              <!-- Classe dynamique pour changer les couleurs en des cards en fonction du type principal -->
              <v-card-title class="justify-center text-uppercase title"
                >Adresse</v-card-title
              >
              <v-card-text class="text-center stat_value pa-4">
                {{ glad.adresse }}</v-card-text
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
                {{ glad.force }}</v-card-text
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
                {{ glad.equilibre }}</v-card-text
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
                {{ glad.vitesse }}</v-card-text
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
                {{ glad.strategie }}</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12" cols="12" class="text-center"
        ><h2>Entrainements</h2></v-col
      >
      <v-col md="4" cols="12">
        <v-btn
          color="warning"
          @click="train('physic', gladiator.id, specialiteLudi)"
          >Entrainement physique</v-btn
        >
      </v-col>
      <v-col md="4" cols="12">
        <v-btn
          color="success"
          @click="train('tactic', gladiator.id, specialiteLudi)"
          >Entrainement tactique</v-btn
        >
      </v-col>
      <v-col md="4" cols="12">
        <v-btn
          color="primary"
          @click="train('combined', gladiator.id, specialiteLudi)"
          >Entrainement combiné</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getGladiatorById,
  getSpecialiteByIdLudi,
  physicTrain,
  tacticTrain,
  combinedTrain,
  checkLastTraining,
} from "../apis/cirque";

export default {
  name: "Ludi",
  data() {
    return { specialiteLudi: "", gladiator: [], success: "", error: "" };
  },
  computed: {
    glad() {
      return this.gladiator;
    },
  },
  async mounted() {
    this.gladiator = await getGladiatorById(this.$route.params.id);
    this.specialiteLudi = await getSpecialiteByIdLudi(this.gladiator.ludiId);
  },
  methods: {
    async train(type, gladiatorId, specialiteLudi) {
      this.success = null;
      this.error = null;
      let check = await checkLastTraining(this.$route.params.id);
      if (check.verif) {
        let result;
        switch (type) {
          case "physic":
            result = physicTrain(gladiatorId, specialiteLudi, this.glad);
            break;
          case "tactic":
            result = tacticTrain(gladiatorId, specialiteLudi, this.glad);
            break;
          case "combined":
            result = combinedTrain(gladiatorId, specialiteLudi, this.glad);
            break;
        }
        if (result) {
          this.success = "Entrainement réussi !";
          this.gladiator = await getGladiatorById(this.$route.params.id);
        } else {
          this.error = "Entraintement échoué !";
        }
      } else {
        this.error =
          "Vous avez déjà entrainé ce gladiateur aujourd'hui ! Revenez dans " +
          check.hoursLeft +
          " heure(s)";
      }
    },
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

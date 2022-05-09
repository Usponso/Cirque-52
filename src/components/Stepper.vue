<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1"> Etape 1 </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"> Etape 2 </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"> Etape 3 </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field
            v-model="password"
            :type="'password'"
            label="Mot de passe"
          ></v-text-field>
        </div>

        <v-btn color="primary" @click="e1 = 2"> Continuer </v-btn>

        <router-link to="/"><v-btn text> Annuler </v-btn></router-link>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-text-field v-model="laniste" label="Nom de laniste"></v-text-field>

        <v-btn color="primary" @click="e1 = 3"> Continuer </v-btn>

        <v-btn @click="e1 = 1"> Retour </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-text-field
          v-model="ludi"
          label="Nom de votre premier ludi"
        ></v-text-field>
        <v-select
          v-model="specialite"
          :items="items"
          item-text="name"
          item-value="value"
          label="Spécialité"
        ></v-select>

        <v-btn
          color="primary"
          @click="signup(email, password, laniste, ludi, specialite)"
        >
          Continuer
        </v-btn>

        <v-btn text @click="e1 = 2"> Retour </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { createAccount } from "../apis/cirque";

export default {
  data() {
    return {
      e1: 1,
      items: [
        { value: "COURSE_DE_CHAR", name: "Course de char" },
        { value: "LUTTE", name: "Lutte" },
        { value: "ATHLETISME", name: "Athlétisme" },
      ],
      email: "",
      password: "",
      laniste: "",
      ludi: "",
      specialite: "",
    };
  },
  mounted() {
    console.log(this.items);
  },
  methods: {
    async signup(email, password, laniste, ludi, specialite) {
      console.log("signing up..");
      console.log(
        email,
        " / ",
        password,
        " / ",
        laniste,
        " / ",
        ludi,
        " / ",
        specialite
      );
      await createAccount(email, password, laniste, ludi, specialite);
    },
  },
};
</script>

<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Recruter un gladiateur
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Recruter un gladiateur</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-alert v-if="errorRecruit" dense dismissible type="error">{{
              errorRecruit
            }}</v-alert>

            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Nom du gladiateur"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">
          Fermer
        </v-btn>
        <v-btn color="green darken-1" text @click="addGladiator(name)">
          Recruter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addGladiator } from "../apis/cirque";
export default {
  data: () => ({
    dialog: false,
    name: null,
    success: null,
    errorRecruit: null,
  }),
  props: {
    idLudi: { type: String, required: true },
  },
  methods: {
    async addGladiator(name) {
      this.success = false;
      this.errorRecruit = null;
      if (this.$store.state.deniers >= 5) {
        this.success = await addGladiator(name, this.idLudi);
        this.name = "";
        this.$emit("gladiatorAdded");
      } else {
        this.errorRecruit =
          "Vous n'avez pas assez de deniers pour recruter un nouveau gladiateur ! (Coût : 5 deniers)";
      }
    },
  },
};
</script>

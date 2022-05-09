<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Ajouter un ludi
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Ajouter un ludi</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Nom du ludi"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="specialite"
                :items="items"
                item-text="name"
                item-value="value"
                label="Spécialité"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Fermer
        </v-btn>
        <v-btn color="blue darken-1" text @click="addLudi(name, specialite)">
          Ajouter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addLudi } from "../apis/cirque";
export default {
  data: () => ({
    dialog: false,
    items: [
      { value: "COURSE_DE_CHAR", name: "Course de char" },
      { value: "LUTTE", name: "Lutte" },
      { value: "ATHLETISME", name: "Athlétisme" },
    ],
    name: null,
    specialite: null,
    success: null,
  }),
  methods: {
    async addLudi(name, specialite) {
      this.success = false;
      this.success = await addLudi(name, specialite, this.$store.state.id);
    },
  },
};
</script>

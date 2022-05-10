<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        {{ $t("recruitGladiator") }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5"> {{ $t("recruitGladiator") }} </span>
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
                :label="$t('gladiatorName')"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">
          {{ $t("close") }}
        </v-btn>
        <v-btn color="green darken-1" text @click="addGladiator(name)">
          {{ $t("recruit") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addGladiator, getGladiatorsByLudi } from "../apis/cirque";
export default {
  data: () => ({
    dialog: false,
    name: null,
    success: null,
    errorRecruit: null,
    nbGladiators: null,
  }),
  props: {
    idLudi: { type: String, required: true },
  },
  methods: {
    async addGladiator(name) {
      this.success = false;
      this.errorRecruit = null;
      this.nbGladiators = await getGladiatorsByLudi(this.idLudi);
      if (this.$store.state.deniers >= 5) {
        if (this.nbGladiators.length < 10) {
          this.success = await addGladiator(name, this.idLudi);
          this.name = "";
          this.gladiators = await getGladiatorsByLudi(this.$route.params.id);
        } else {
          this.errorRecruit = this.$t("gladiatorLimit");
        }
      } else {
        this.errorRecruit = this.$t("moneyLimit");
      }
    },
  },
};
</script>

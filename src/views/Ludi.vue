<template>
  <v-container>
    <v-row>
      <v-btn @click="goBack()">
        <v-icon> mdi-chevron-left</v-icon> Retour
      </v-btn>
    </v-row>
    <br />
    <br />
    <v-row>
      <GladiatorModal
        @gladiatorAdded="getNewGladiator()"
        :idLudi="this.$route.params.id"
      />
    </v-row>
    <br />
    <br />
    <v-row>
      <v-col v-for="gladiator in gladiators" :key="gladiator.id" cols="4">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">GLADIATEUR</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ gladiator.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"
              ><img src="../assets/gladiator.png"
            /></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text
              ><router-link :to="{ path: `/gladiator/${gladiator.id}` }">
                Voir
              </router-link></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getGladiatorsByLudi } from "../apis/cirque";
import GladiatorModal from "../components/GladiatorModal.vue";

export default {
  name: "Ludi",
  data() {
    return { ludi: [], gladiators: [] };
  },
  components: { GladiatorModal },
  async mounted() {
    // this.ludi = await getLudiById(this.$route.params.id); // inutile
    this.gladiators = await getGladiatorsByLudi(this.$route.params.id);
  },
  methods: {
    async getNewGladiator() {
      console.log("emit");
      this.gladiators = await getGladiatorsByLudi(this.$route.params.id);
      console.log(this.gladiators);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

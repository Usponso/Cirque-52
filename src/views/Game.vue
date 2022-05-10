<template>
  <div>
    <v-container>
      <LudiModal />
      <br />
      <br />
      <v-row>
        <v-col v-for="ludi in this.$store.state.ludis" :key="ludi.id" cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">{{ ludi.specialite }}</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ ludi.name }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey"
                ><img src="../assets/ludi.jpg"
              /></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn outlined rounded text
                ><router-link :to="{ path: `/ludi/${ludi.id}` }">
                  {{ $t("open") }}
                </router-link></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { getLudisByAccount } from "../apis/cirque";
import LudiModal from "../components/LudiModal.vue";

export default {
  name: "Game",
  mounted() {
    getLudisByAccount(this.$store.state.id);
  },
  components: { LudiModal },
};
</script>

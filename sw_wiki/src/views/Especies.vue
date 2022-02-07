<template>
  <div>
    <div class="text-center" v-show="especiesResponse.count >= 0">
      <v-pagination v-model="page" 
          :length="totalPages" 
          color="grey"
          @next="nextPage"
          @previous="prevPage"></v-pagination>
    </div>
    <div>
      <v-container>
        <v-row dense>
          <v-col cols="12 d-flex flex-wrap">
            <card-especies
              v-for="(especie, index) in especiesResponse.results"
              :key="index"
              :idCard ="'card_especie_'+index"
              :especie="especie"
              class="col-4"
            >
            </card-especies>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CardEspecies from '../components/CardEspecies.vue';

export default {
  data: () => ({
    pessoas: null,
    next: "",
    previous: "",
    count: 0,
    response: null,
    page: 1,
  }),
  components: {
    CardEspecies,
  },
  methods: {
    nextPage(){
      this.$store.dispatch("nextPageEspecies")
    },
    prevPage(){
      this.$store.dispatch("prevPageEspecies")
    }
  },
  async mounted() {
    this.$store.dispatch("fetchEspecies","https://swapi.dev/api/species/")
  },
  computed: {
    ...mapState(['especiesResponse']),
    totalPages() {
      const total =  Math.ceil(this.especiesResponse.count / 10);
      return total;
    }      
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div class="text-center" v-show="veiculosResponse.count >= 0">
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
            <card-veiculos
              v-for="(veiculo, index) in veiculosResponse.results"
              :key="index"
              :idCard ="'card_veiculo_'+index"
              :veiculo="veiculo"
              class="col-4"
            >
            </card-veiculos>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CardVeiculos from '../components/CardVeiculos.vue';

export default {
  data: () => ({
    naves: null,
    next: "",
    previous: "",
    count: 0,
    response: null,
    page: 1,
  }),
  components: {
    CardVeiculos,
  },
  methods: {
    nextPage(){
      this.$store.dispatch("nextPageVeiculos")
    },
    prevPage(){
      this.$store.dispatch("prevPageVeiculos")
    }
  },
  async mounted() {
    this.$store.dispatch("fetchVeiculos","https://swapi.dev/api/vehicles/")
  },
  computed: {
    ...mapState(['veiculosResponse']),
    totalPages() {
      const total =  Math.ceil(this.veiculosResponse.count / 10);
      return total;
    }      
  },
};
</script>

<style>
</style>
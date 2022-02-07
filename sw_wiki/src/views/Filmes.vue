<template>
  <div>
    <div class="text-center" v-show="filmesResponse.count >= 0">
      <v-pagination v-model="page" 
          :length="totalPages" 
          color="grey"></v-pagination>
    </div>
    <div>
      <v-container>
        <v-row dense>
          <v-col cols="12 d-flex flex-wrap">
            <card-filmes
              v-for="(filme, index) in filmesResponse.results"
              :key="index"
              :idCard ="'card_filme_'+index"
              :filme="filme"
              class="col-4"
            >
            </card-filmes>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CardFilmes from '../components/CardFilmes.vue';

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
    CardFilmes,
  },
  async mounted() {
    this.$store.dispatch("fetchFilmes","https://swapi.dev/api/films/")
  },
  computed: {
    ...mapState(['filmesResponse']),
    totalPages() {
      const total =  Math.ceil(this.filmesResponse.count / 10);
      return total;
    }      
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div class="text-center" v-show="pessoasResponse.count >= 0">
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
            <card-pessoa
              v-for="(pessoa, index) in pessoasResponse.results"
              :key="index"
              :idCard ="'card_pessoa_'+index"
              :pessoa="pessoa"
              class="col-4"
            >
            </card-pessoa>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import CardPessoa from "../components/CardPessoa.vue";
import {mapState} from 'vuex';

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
    CardPessoa,
  },
  methods: {
    nextPage(){
      this.$store.dispatch("nextPagePessoas")
    },
    prevPage(){
      this.$store.dispatch("prevPagePessoas")
    }
  },
  async mounted() {
    this.$store.dispatch("fetchPessoas","https://swapi.dev/api/people/")
  },
  computed: {
    ...mapState(['pessoasResponse']),
    totalPages() {
      const total =  Math.ceil(this.pessoasResponse.count / 10);
      return total;
    }      
  },
};
</script>

<style>
</style>
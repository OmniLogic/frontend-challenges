<template>
  <div>
    <div class="text-center" v-show="planetasResponse.count >= 0">
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
            <card-planeta
              v-for="(planeta, index) in planetasResponse.results"
              :key="index"
              :idCard ="'card_planeta_'+index"
              :planeta="planeta"
              class="col-4"
            >
            </card-planeta>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import CardPlaneta from "../components/CardPlaneta.vue";
import {mapState} from 'vuex';

export default {
  data: () => ({
    planetas: null,
    next: "",
    previous: "",
    count: 0,
    response: null,
    page: 1,
  }),
  components: {
    CardPlaneta,
  },
  methods: {
    nextPage(){
      this.$store.dispatch("nextPagePlanetas")
    },
    prevPage(){
      this.$store.dispatch("prevPagePlanetas")
    }
  },
  async mounted() {
    this.$store.dispatch("fetchPlanetas","https://swapi.dev/api/planets/")
  },
  computed: {
    ...mapState(['planetasResponse']),
    totalPages() {
      const total =  Math.ceil(this.planetasResponse.count / 10);
      return total;
    }      
  },
};
</script>

<style>
</style>
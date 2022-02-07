<template>
  <div>
    <div class="text-center" v-show="navesResponse.count >= 0">
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
            <card-naves
              v-for="(nave, index) in navesResponse.results"
              :key="index"
              :idCard ="'card_nave_'+index"
              :nave="nave"
              class="col-4"
            >
            </card-naves>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import CardNaves from "../components/CardNaves.vue";
import {mapState} from 'vuex';

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
    CardNaves,
  },
  methods: {
    nextPage(){
      this.$store.dispatch("nextPageNaves")
    },
    prevPage(){
      this.$store.dispatch("prevPageNaves")
    }
  },
  async mounted() {
    this.$store.dispatch("fetchNaves","https://swapi.dev/api/starships/")
  },
  computed: {
    ...mapState(['navesResponse']),
    totalPages() {
      const total =  Math.ceil(this.navesResponse.count / 10);
      return total;
    }      
  },
};
</script>

<style>
</style>
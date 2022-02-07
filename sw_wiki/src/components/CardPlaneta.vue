<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="370">
      <v-card-text>
        <p class="text-h4 text--primary">{{planeta.name}}</p>
        <p>{{'Climate: '+ planeta.climate}}</p>
        <div class="text--primary">
          {{'Terrain: '+ planeta.terrain}}<br>
          {{'Population: '+planeta.population}}<br>
          {{"Rotation Period: "+ planeta.rotation_period}} <br>
          {{'Orbital Period: '+ planeta.orbital_period}} <br>
          {{'Diameter: '+ planeta.diameter + ' Km'}}<br>
          {{'Gravity: '+ planeta.gravity}}<br>
          {{'Surface Water: '+ planeta.surface_water}}<br>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="getExternos(planeta.residents, planeta.films)">
          Ligações Externas
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="$store.state.globalCard == idCard"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">Moradores</p>
            
            <p v-for="resident in $store.state.pessoaExterna" 
              :key="resident"
              class="text-subtitle-1 mb-0">
              {{resident}}
            </p>

            <p class="text-h4 text--primary mt-4">Filmes</p>
            
            <p v-for="filme in $store.state.filmeExterno" 
              :key="filme"
              class="text-subtitle-1 mb-0">
              {{filme}}
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="teal accent-4" @click="closeCard">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "CardPlaneta",
  data: () => ({
    reveal: false,
  }),
  props: {
    title: String,
    planeta: Object,
    idCard : String,
  },
  methods: {
    getPessoa(url){
      this.$store.dispatch("fetchPessoa",url)
      return this.$store.state.pessoa
    },
    getExternos(residentes, filmes){
      //revela o card
      this.$store.commit("UPDATE_GLOBAL_CARD", this.idCard)
      this.reveal = true

    //consulta as pessoas externamente
      const listaResidente = []
      residentes.forEach(residente => {
        fetch(residente)
          .then(r => r.json())
          .then(rj => listaResidente.push(rj.name))
      });
      this.$store.dispatch("fetchPessoasExternas", listaResidente)

    //consulta filmes externamente
      const listaFilmes = []
      filmes.forEach(filme => {
        fetch(filme)
          .then(r => r.json())
          .then(rj => listaFilmes.push(rj.title))
      });
      this.$store.dispatch("fetchFilmesExternos", listaFilmes)
     
    },
    closeCard(){
      this.$store.commit('UPDATE_GLOBAL_CARD', null)
    }
  },
  calculated: { ...mapState(['globalCard']),
    
    },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="370">
      <v-card-text>
        <p class="text-h4 text--primary">{{veiculo.name}}</p>
        <p>{{'Model: '+ veiculo.model}}</p>
        <div class="text--primary">
          {{'Manufacturer: '+ veiculo.manufacturer}}<br>
          {{'Cost: '+veiculo.cost_in_credits}}<br>
          {{"Length: "+ veiculo.length}} <br>
          {{'Max. Speed: '+ veiculo.max_atmosphering_speed}} <br>
          {{'Crew: '+ veiculo.crew}}<br>
          {{'Passengers: '+ veiculo.passengers}}<br>
          {{'Cargo Cap.: '+ veiculo.cargo_capacity + " Kg"}}<br>
          {{'Consumables: '+ veiculo.consumables}}<br>
          {{'Class: '+ veiculo.vehicle_class}}<br>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="getExternos(veiculo.pilots, veiculo.films)">
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
            <p class="text-h4 text--primary">Pilotos</p>
            
            <p v-for="pilot in $store.state.pessoaExterna" 
              :key="pilot"
              class="text-subtitle-1 mb-0">
              {{pilot}}
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
  name: "CardVeiculo",
  data: () => ({
    reveal: false,
  }),
  props: {
    title: String,
    veiculo: Object,
    idCard : String,
  },
  methods: {
    getExternos(pilotos, filmes){
      //revela o card
      this.$store.commit("UPDATE_GLOBAL_CARD", this.idCard)
      this.reveal = true

    //consulta as pessoas externamente
      const listaPilotos = []
      pilotos.forEach(piloto => {
        fetch(piloto)
          .then(r => r.json())
          .then(rj => listaPilotos.push(rj.name))
      });
      this.$store.dispatch("fetchPessoasExternas", listaPilotos)

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
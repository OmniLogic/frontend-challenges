<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="370">
      <v-card-text>
        <p class="text-h4 text--primary">{{nave.name}}</p>
        <p>{{'Model: '+ nave.model}}</p>
        <div class="text--primary">
          {{'Manufacturer: '+ nave.manufacturer}}<br>
          {{'Cost: '+nave.cost_in_credits}}<br>
          {{"Length: "+ nave.length}} <br>
          {{'Max. Speed: '+ nave.max_atmosphering_speed}} <br>
          {{'Crew: '+ nave.crew}}<br>
          {{'Passengers: '+ nave.passengers}}<br>
          {{'Cargo Cap.: '+ nave.cargo_capacity + " Kg"}}<br>
          {{'Consumables: '+ nave.consumables}}<br>
          {{'Hyperdrive Rating: '+ nave.hyperdrive_rating}}<br>
          {{'MGLT: '+ nave.MGLT}}<br>
          {{'Class: '+ nave.starship_class}}<br>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="getExternos(nave.pilots, nave.films)">
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
  name: "CardNave",
  data: () => ({
    reveal: false,
  }),
  props: {
    title: String,
    nave: Object,
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
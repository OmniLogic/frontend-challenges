<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="370">
      <v-card-text>
        <p class="text-h4 text--primary">{{filme.title}}</p>
        <p>{{'Ep. Number: '+ filme.episode_id}}</p>
        <div class="text--primary">
          {{'Director: '+ filme.director + " Kg"}}<br>
          {{'Producer: '+filme.producer}}<br>
          {{"Release Date: "+ filme.release_date}} <br>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" 
            @click="getExternos(filme.planets, filme.characters, filme.species ,filme.vehicles, filme.starships)">
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
            
            <p class="text-h4 text--primary mt-4">Planetas</p>
            
            <p v-for="planeta in $store.state.mundoExterno" 
              :key="planeta"
              class="text-subtitle-1 mb-0">
              {{planeta}}
            </p>

            <p class="text-h4 text--primary mt-4">Personagens</p>
            
            <p v-for="char in $store.state.pessoaExterna" 
              :key="char"
              class="text-subtitle-1 mb-0">
              {{char}}
            </p>

            <p class="text-h4 text--primary mt-4">Espécie</p>
            
            <p v-for="especie in $store.state.especieExterna" 
              :key="especie"
              class="text-subtitle-1 mb-0">
              {{especie}}
            </p>

            <p class="text-h4 text--primary mt-4">Veículos</p>
            
            <p v-for="veiculo in $store.state.veiculoExterno" 
              :key="veiculo"
              class="text-subtitle-1 mb-0">
              {{veiculo}}
            </p>

            <p class="text-h4 text--primary">Naves</p>
            
            <p v-for="nave in $store.state.naveExterna" 
              :key="nave"
              class="text-subtitle-1 mb-0">
              {{nave}}
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
  name: "CardFilme",
  data: () => ({
    reveal: false,
  }),
  props: {
    title: String,
    filme: Object,
    idCard : String,
  },
  methods: {
    getExternos(mundos, pessoas, especies, veiculos, naves){
      //revela o card
      this.$store.commit("UPDATE_GLOBAL_CARD", this.idCard)
      this.reveal = true

    //consulta mundo externamente
    const listaMundos = []
       mundos.forEach(mundo => {
        fetch(mundo)
          .then(r => r.json())
          .then(rj => listaMundos.push(rj.name))
      });
      this.$store.dispatch("fetchMundoExterno", listaMundos)


    //consulta as pessoas externamente
      const listaPessoas = []
      pessoas.forEach(pessoa => {
        fetch(pessoa)
          .then(r => r.json())
          .then(rj => listaPessoas.push(rj.name))
      });
      this.$store.dispatch("fetchPessoasExternas", listaPessoas)

    //consulta especies externamente
      const listaEspecies = []
      especies.forEach(especie => {
        fetch(especie)
          .then(r => r.json())
          .then(rj => listaEspecies.push(rj.name))
      });
      this.$store.dispatch("fetchEspeciesExternas", listaEspecies)

     //consulta veiculos externamente
      const listaVeiculos = []
      veiculos.forEach(veiculo => {
        fetch(veiculo)
          .then(r => r.json())
          .then(rj => listaVeiculos.push(rj.name))
      });
      this.$store.dispatch("fetchVeiculosExternos", listaVeiculos)

     //consulta naves externamente
      const listaNaves = []
      naves.forEach(nave => {
        fetch(nave)
          .then(r => r.json())
          .then(rj => listaNaves.push(rj.name))
      });
      this.$store.dispatch("fetchNavesExternas", listaNaves)
     
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
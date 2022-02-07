<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="370">
      <v-card-text>
        <p class="text-h4 text--primary">{{pessoa.name}}</p>
        <p>{{'Height: '+ pessoa.height + " cm"}}</p>
        <div class="text--primary">
          {{'Mass: '+ pessoa.mass + " Kg"}}<br>
          {{'Hair Color: '+pessoa.hair_color}}<br>
          {{"Skin Color: "+ pessoa.skin_color}} <br>
          {{'Eye Color: '+ pessoa.eye_color}} <br>
          {{'Birth Year: '+ pessoa.birth_year}}<br>
          {{'Gender: '+ pessoa.gender}}<br>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" 
            @click="getExternos(pessoa.homeworld, pessoa.films, pessoa.species ,pessoa.vehicles, pessoa.starships)">
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
            
            <p class="text-h4 text--primary mt-4">Terra Natal</p>
            
            <p class="text-subtitle-1 mb-0">
              {{$store.state.mundoExterno}}
            </p>

            <p class="text-h4 text--primary mt-4">Filmes</p>
            
            <p v-for="filme in $store.state.filmeExterno" 
              :key="filme"
              class="text-subtitle-1 mb-0">
              {{filme}}
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
  name: "CardPessoa",
  data: () => ({
    reveal: false,
  }),
  props: {
    title: String,
    pessoa: Object,
    idCard : String,
  },
  methods: {
    getExternos(mundo, filmes, especies, veiculos, naves){
      //revela o card
      this.$store.commit("UPDATE_GLOBAL_CARD", this.idCard)
      this.reveal = true

    //consulta mundo externamente
        fetch(mundo)
          .then(r => r.json())
          .then(rj => {
              this.$store.dispatch("fetchMundoExterno", rj.name)
          })


    //consulta filmes externamente
      const listaFilmes = []
      filmes.forEach(filme => {
        fetch(filme)
          .then(r => r.json())
          .then(rj => listaFilmes.push(rj.title))
      });
      this.$store.dispatch("fetchFilmesExternos", listaFilmes)

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
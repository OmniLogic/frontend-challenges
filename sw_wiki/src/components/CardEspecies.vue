<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="370">
      <v-card-text>
        <p class="text-h4 text--primary">{{especie.name}}</p>
        <p>{{'Classification: '+ especie.classification}}</p>
        <div class="text--primary">
          {{'Designation: '+ especie.designation}}<br>
          {{'Population: '+especie.population}}<br>
          {{"Average Height"+ especie.average_height}} <br>
          {{'Skin Colors: '+ especie.skin_colors}} <br>
          {{'Hair Colors: '+ especie.hair_colors }}<br>
          {{'Eye Colors: '+ especie.eye_colors}}<br>
          {{'Average Lifespan: '+ especie.average_lifespan}}<br>
          {{'Language: '+ especie.language}}<br>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="getExternos(especie.homeworld, especie.people, especie.films)">
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

            <p class="text-h4 text--primary mt-4">Planeta Natal</p>
            
            <p class="text-subtitle-1 mb-0">
              {{$store.state.mundoExterno}}
            </p>

            <p class="text-h4 text--primary">Pessoas</p>
            
            <p v-for="pessoa in $store.state.pessoaExterna" 
              :key="pessoa"
              class="text-subtitle-1 mb-0">
              {{pessoa}}
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
  name: "CardEspecie",
  data: () => ({
    reveal: false,
  }),
  props: {
    title: String,
    especie: Object,
    idCard : String,
  },
  methods: {
    getExternos(planeta, pessoas, filmes){
      //revela o card
      this.$store.commit("UPDATE_GLOBAL_CARD", this.idCard)
      this.reveal = true

    //consulta mundo externamente
        fetch(planeta)
          .then(r => r.json())
          .then(rj => {
              this.$store.dispatch("fetchMundoExterno", rj.name)
          })

    //consulta as pessoas externamente
      const listaPessoas = []
      pessoas.forEach(pessoa => {
        fetch(pessoa)
          .then(r => r.json())
          .then(rj => listaPessoas.push(rj.name))
      });
      this.$store.dispatch("fetchPessoasExternas", listaPessoas)

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
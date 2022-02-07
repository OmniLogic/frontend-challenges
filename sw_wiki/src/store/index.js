import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //variaveis de planeta
    planetasResponse: null,
    planeta : null,

    //variaveis de nave
    navesResponse: null,
    nave: null,

    //variaveis de pessoa
    pessoasResponse: null,
    pessoa: null,

    //variavel de controle dos card global
    globalCard : null,

    //variaveis para consultas externas
    pessoaExterna: null,
    filmeExterno: null,
    especieExterna: null,
    veiculoExterno: null,
    naveExterna: null,
    mundoExterno: null,


  },
  mutations: {
    UPDATE_GLOBAL_CARD(state, payload){
      state.globalCard = payload
    },
    UPDATE_PLANETAS(state, payload){
      state.planetasResponse = payload
    },
    UPDATE_PLANETA(state, payload){
      state.planeta = payload
    },
    UPDATE_NAVES(state, payload){
      state.navesResponse = payload
    },
    UPDATE_PESSOAS(state, payload){
      state.pessoasResponse = payload
    },
    UPDATE_PESSOA_EXTERNA(state, payload){
      state.pessoaExterna = payload
    },
    UPDATE_FILME_EXTERNO(state, payload){
      state.filmeExterno = payload
    },
    UPDATE_ESPECIE_EXTERNA(state, payload){
      state.especieExterna = payload
    },
    UPDATE_VEICULO_EXTERNO(state, payload){
      state.veiculoExterno = payload
    },
    UPDATE_NAVE_EXTERNA(state, payload){
      state.naveExterna = payload
    },
    UPDATE_MUNDO_EXTERNO(state, payload){
      state.mundoExterno = payload
    },
  },
  actions: {
    //AÇOES REFERENTES A PAGINA DE PLANETAS
    fetchPlanetas(context, url){
      fetch(url)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_PLANETAS", rj)
        })
    },
    nextPagePlanetas(context){
      fetch(context.state.planetasResponse.next)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_PLANETAS", rj)
        })
    },
    prevPagePlanetas(context){
      fetch(context.state.planetasResponse.previous)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_PLANETAS", rj)
        })
    },

    //ACOES REFERENTES A PAGINA DE NAVES
    fetchNaves(context, url){
      fetch(url)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_NAVES", rj)
        })
    },
    nextPageNaves(context){
      fetch(context.state.navesResponse.next)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_NAVES", rj)
        })
    },
    prevPageNaves(context){
      fetch(context.state.navesResponse.previous)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_NAVES", rj)
        })
    },

    //ACOES REFERENTES A PAGINA DE VEICULOS

    //ACOES REFERENTES A PAGINA DE PESSOAS
    fetchPessoas(context, url){
      fetch(url)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_PESSOAS", rj)
        })
    },
    nextPagePessoas(context){
      fetch(context.state.pessoasResponse.next)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_PESSOAS", rj)
        })
    },
    prevPagePessoas(context){
      fetch(context.state.pessoasResponse.previous)
        .then(resp => resp.json())
        .then(rj => {
          context.commit("UPDATE_PESSOAS", rj)
        })
    },

    //ACOES DE CONSULTAS EXTERNAS
    async fetchPessoasExternas(context, listaMoradores){
      context.commit("UPDATE_PESSOA_EXTERNA", listaMoradores)
    },
    async fetchFilmesExternos(context, listaFilmes){
      context.commit("UPDATE_FILME_EXTERNO", listaFilmes)
    },
    async fetchEspeciesExternas(context, listaEspecies){
      context.commit("UPDATE_ESPECIE_EXTERNA", listaEspecies)
    },
    async fetchVeiculosExternos(context, listaVeiculos){
      context.commit("UPDATE_VEICULO_EXTERNO", listaVeiculos)
    },
    async fetchNavesExternas(context, listaNaves){
      context.commit("UPDATE_NAVE_EXTERNA", listaNaves)
    },
    async fetchMundoExterno(context, mundoExterno){
      context.commit("UPDATE_MUNDO_EXTERNO", mundoExterno)
    }
  },
  modules: {
  }
})

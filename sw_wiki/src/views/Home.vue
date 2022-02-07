<template>
  <div>
    <v-row  justify="center">
      <v-col cols='12' sm="8"> 
        <carousel />
      </v-col>
    </v-row>
    <v-row  justify="center">
      <v-col cols='12' sm="6"> 
        <div class="hello flex-column">
          <h1 class="mb-8 d-flex justify-center">Bem-vindo ao Star Wars Wiki!</h1>  
          <p class="mb-5">
            Nesta wiki, você navegará através do fantástico mundo de Star Wars.
            Descobrirá mundos, pessoas, naves e muito mais. Para começar, basta selecionar
            um dos cards acima. Aperte os sintos e vamos lá!
          </p>
          <em class="mt-2 mb-4">"Nessas ruas perigosas, um jovem luta pela sobrevivência, mas anseia por voar entre as estrelas."</em>
          <h5>- Han Solo</h5>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";

export default {
  name: "Home",

  components: {
    Carousel,
  },
};
</script>

<style>
.hello{
    font-family: 'Days One', sans-serif;
    
    color: yellow;
  }

p{
  font-size: 25px;
}
</style>

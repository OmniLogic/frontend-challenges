<template>
  <v-app>
    <!-- <v-img src="https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars -backgrounds-14.jpg"> -->
      <v-app-bar app color="gray" dark height="100">
        <div class="d-flex align-center">
          <v-img
            alt="R2D2 Logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="40"
          />

         <v-img
            alt="Star Wars Wiki Name"
            class="shrink mt-1 hidden-sm-and-down d-flex align-start"
            contain
            min-width="100"
            src="./assets/sw_name_logo.png"
            width="150"
          />
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://swapi.dev/" target="_blank" text>
          <span class="mr-2">SW API</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main class="appback">
        <router-view />
      </v-main>

      <v-footer class="appback">
        <v-bottom-navigation v-model="value" dark>
          <v-btn
            value="creator"
            href="https://github.com/igorpserra"
            target="_blank"
          >
            <span>Criado por: @igorpserra</span>
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-footer>
    <!--</v-img>-->
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    value: "",
  }),
};
</script>
<style>
  .appback{
    background: 
      url("https://cdn.wallpapersafari.com/81/5/tpObWP.png");
  }
</style>
<template>
  <v-carousel class="mt-3" height="400" dark>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      :to="item.to"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <div class="title">
        <p class="font-title">{{item.title}}</p>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousel",

  data: () => ({
    items: [
      {
        src: "https://reviewsyouread.files.wordpress.com/2021/03/10-more-star-wars-planets-as-countries.png",
        title: "Planetas",
        to:'/planetas'
      },
      {
        src: "https://media.contentapi.ea.com/content/dam/eacom/en-us/migrated-images/2016/11/news-article-images-ships-blog-image-16x9.jpg",
        title: "Naves",
        to:'/naves'
      },
      {
        src: "https://lrmonline.com/wp-content/uploads/2021/05/Star-WArs-Hoth-2.jpeg",
        title: "Veiculos",
        to:'/veiculos'
      },
      {
        src: "https://mlhzuphabiq8.i.optimole.com/AUnRiBM-EI99CML_/w:1024/h:576/q:90/https://pordentrodatela.com.br/wp-content/uploads/2019/11/star-wars-por-dentro-da-tela.jpg",
        title: "Pessoas",
        to: '/pessoas',
      },
      {
        src: "https://cdn.unifiedcommerce.com/content/product/large/079346118045.jpg",
        title: "Filmes",
        to:'/filmes'
      },
      {
        src: "https://i0.wp.com/zyteheist.com/wp-content/uploads/2017/12/star-wars-battlefront-species-1280jpg-c74ff0_1280w.jpg?resize=900%2C506&ssl=1",
        title: "Espécies",
        to: '/especies'
      },
    ],
  }),
};
</script>
<style>
.title {
  position: absolute;
  bottom: 50px;
  color: yellow;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
}

.font-title {
  font-family: "Days One", sans-serif;
}
</style>
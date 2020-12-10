<template>
  <v-container dark class="blue-grey darken-4" fluid grid-list-md>
    <v-card color="#25214F" dark class="justify-center">
      <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="#191C1F" dark>
        <v-flex xs2 sm2 md1>
          <v-list-item-avatar>
            <v-img src="../assets/football-157930_640.png"></v-img>
          </v-list-item-avatar>
        </v-flex>
        <v-flex xs4 sm4 md2>
          <v-toolbar-title>
            <span>FootballData</span>
          </v-toolbar-title>
        </v-flex>

        <v-flex xs4 sm4 md2>
          <v-chip class="ma-2" color="red" text-color="white" label>
            <v-btn icon href="https://www.youtube.com/" target="_blank">
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
          </v-chip>
        </v-flex>

        <v-flex xs4 sm4 md2>
          <v-chip
            class="ma-2"
            color="purple lighten-1"
            text-color="white"
            label
          >
            <v-btn icon href="https://www.instagram.com/" target="_blank">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </v-chip>
        </v-flex>

        <v-flex xs4 sm4 md2>
          <v-chip class="ma-2" color="cyan" text-color="white" label>
            <v-btn icon href="https://www.twitter.com/" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </v-chip>
        </v-flex>

        <v-flex xs4 sm4 md2>
          <v-chip class="ma-2" color="grey darken-3" text-color="white" label>
            <v-btn icon href="https://www.github.com/" target="_blank">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-chip>
        </v-flex>
        <v-flex xs4 sm4 md2>
          <v-chip class="ma-2" color="green" text-color="white" label>
            <v-btn icon href="https://www.footballmanager.com/" target="_blank">
              <v-icon>mdi-strategy</v-icon>
            </v-btn>
          </v-chip>
        </v-flex>
      </v-app-bar>
      <center>
          <br />
          <h1>HERRAMIENTA PARA EL ENTRENADOR</h1>        
        </center>      
        <br />
      <center>
        <center>
          <h3>{{ texto }}</h3>        
        </center>
        <br />
        <v-img height="400" width="700" src="../assets/football-3024154_1920.jpg"></v-img>
      </center>
      <br />
      <br />

      <v-flex xs12 sm12 md12> </v-flex>

      <center>
          <h3>{{ forms }}</h3>        
        </center>
      <br />
      <br />
    </v-card>
    <v-card color="#25214F" dark class="justify-center">
      <v-layout row wrap align-center>
        <v-flex xs3 sm3 md3>
          <center>
            <v-btn color="#49D0D0" @click="click433" rounded class="my-2">4-3-3</v-btn>
          </center>
        </v-flex>
        <v-flex xs3 sm3 md3>
          <center>
            <v-btn color="#34CBCB" @click="click4213" rounded class="my-2">4-2-1-3</v-btn>
          </center>
        </v-flex>
        <v-flex xs3 sm3 md3>
          <center>
            <v-btn color="#2FB6B6" @click="click4231" rounded class="my-2">4-2-3-1</v-btn>
          </center>
        </v-flex>

        <v-flex xs3 sm3 md3>
          <center>
            <v-btn color="#2AA2A2" @click="click41212" rounded class="my-2">4-1-2-1-2</v-btn>
          </center>
        </v-flex>
      </v-layout>
      <br />
      <br />
      <center>
          <br />
          <h3>{{ expl }}</h3>        
        </center>
      <br />
      <br />
    </v-card>

    <v-footer class="warning" padless dark>
      <br />
      <v-col class="warning py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>FootballData</strong>
      </v-col>
      <v-row justify="center" no-gutters>
        <br />
            <v-btn width:100px color="#1F7A7A" @click="clickMain" rounded class="my-2">Home</v-btn>
            <v-divider class="mx-4" vertical></v-divider>
            <v-btn width:100px color="#2AA2A2" @click="clickFormations" rounded class="my-2">Formaciones</v-btn>
            <v-divider class="mx-4" vertical></v-divider>
            <v-btn width:100px color="#34CBCB" @click="clickFaq" rounded class="my-2">FAQ</v-btn>
            <v-divider class="mx-4" vertical></v-divider>
        <br />
      </v-row>

      <v-col class="text-center" cols="12">
        <h1 class="overline pt-3 white--text">
          <a target="_blank" color="#00F7FF"></a> icons by
          <a color="#00F7FF" target="_blank" href="http://code.meta-platform.com/assets/mdi/preview.html">code.meta-platform</a>
        </h1>
      </v-col>
    </v-footer>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    texto:
      "En esta sección de la página web, tendrás que elegir una formación que será utilizada para que luego puedas introducir los datos de los jugadores de tu equipo y así calcular la estrategia que mejor se adapta a tu once titular.",
    forms:
      "Se han incluido las 4 formaciones más utilizadas en el fútbol actual.",
    expl:
      "Una vez que hayas pulsado en una de las formaciones, la página web te redireccionará a un cuestionario en el que tendrás que introducir las 12 estadísticas de cada jugador para calcular diferentes parámetros a partir de ellas.",
  }),
  methods: {
    click433() {
      this.$router.push("/433");
    },
    click442() {
      this.$router.push("/442");
    },
    click451() {
      this.$router.push("/451");
    },
    click4213() {
      this.$router.push("/4213");
    },
    click4231() {
      this.$router.push("/4231");
    },
    click41212() {
      this.$router.push("/41212");
    },
    click343() {
      this.$router.push("/343");
    },
    click352() {
      this.$router.push("/352");
    },
    click523() {
      this.$router.push("/523");
    },
    click532() {
      this.$router.push("/532");
    },
    clickFaq() {
      this.$router.push("/faq");
    },
    clickMain() {
      this.$router.push("/bi");
    },
    clickFormations() {
      this.$router.push("/formations");
    },
  },
};
</script>
<template>
  <v-container dark class="blue-grey darken-4" fluid grid-list-md>
    <v-layout>
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
          <v-chip class="ma-2" color="purple lighten-1" text-color="white" label>
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
    </v-layout>
    <v-flex xs12 sm12 md12>
      <v-card color="#25214F" dark class="justify-center">
        <center>
          <br />
          <h1>HERRAMIENTA PARA EL ENTRENADOR</h1>        
        </center>
        <!--<v-card-text class="justify-center">{{ texto }}</v-card-text>-->
        <center>
          <br />
          <h3>{{ texto }}</h3>        
        </center>
        <center>
          <br />
          <v-img height="400" width="700" src="../assets/assembly-4840685_640.jpg"></v-img>
          <br />
          <br />
        </center>
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item dark v-for="(item, i) in items" :key="i" :color="item.color" :icon="item.icon" fill-dot>
            <v-card :color="item.color" dark>
              <v-card-title dark class="title">
                <span dark v-text="item.titulo"></span>
              </v-card-title>
              <v-card-text dark class="white text--primary">
                <p>
                  <br />
                  <span dark v-text="item.texto"></span>
                </p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <br />

        <v-layout>
          <v-flex xs5 sm5 md5> </v-flex>
          <v-flex xs2 sm2 md2>
            <v-btn color="#34cbcb" x-large @click="clickFormations">
              IR A FORMACIONES
            </v-btn>
          </v-flex>
          <v-flex xs5 sm5 md5> </v-flex>
        </v-layout>
        <br />

        <v-footer class="warning" padless>
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
      </v-card>
    </v-flex>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    texto:
      "Esta página web tiene el principal objetivo de ayudar a los entrenadores a saber cuáles son las fortalezas y debilidades de su equipo, de decidir cuál es la mejor táctica y de recomendar nuevos fichajes para el equipo.",
    valid: false,
    firstname: "",
    lastname: "",
    items: [
      {
        color: "#25598E",
        icon: "mdi-numeric-1-box-outline",
        titulo: "Introduce tu formación",
        texto:
          "En esta página web, lo primero que debes de hacer es introducir la formación que vas a utilizar en tu equipo.",
      },
      {
        color: "#25748E",
        icon: "mdi-numeric-2-box-outline",
        titulo: "Introduce tu once inicial",
        texto:
          "Una vez introducida la formación, tienes que introducir los datos de los jugadores de tu equipo.",
      },
      {
        color: "#258E8E",
        icon: "mdi-numeric-3-box-outline",
        titulo: "Recomendación táctica",
        texto:
          "La aplicación calculará automáticamente la estrategia que mejor se adapta a tus jugadores y las medias de cada atributo.",
      },
      {
        color: "#258E74",
        icon: "mdi-numeric-4-box-outline",
        titulo: "Recomendación de fichajes",
        texto:
          "Se recomendarán fichajes a partir de los jugadores de la plantilla actual, admitiendo la aplicación de filtros.",
      },
    ],
  }),
  methods: {
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
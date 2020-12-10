
<template>
  <v-container dark class="warning" fluid grid-list-md>
    <v-card color="#25214F" dark>
      <br />
      <v-layout>
        <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="#191C1F"
          dark
        >
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
              <v-btn
                icon
                href="https://www.footballmanager.com/"
                target="_blank"
              >
                <v-icon>mdi-strategy</v-icon>
              </v-btn>
            </v-chip>
          </v-flex>
        </v-app-bar>
      </v-layout>
      <v-flex xs12 sm12 md12>
        <v-card color="#221E48" dark>
          <center>
          <h1>HERRAMIENTA PARA EL ENTRENADOR</h1>    
            <br />    
            <h3>En esta sección de la página web de verán reflejadas las
            principales preguntas que puede surgir a los usuarios de la
            aplicación.</h3>
          </center>
          <center>
            <br />
            <v-img
              height="300"
              width="300"
              src="../assets/question-2519654_640.png"
            ></v-img>
            <br />
            <br />
          </center>
        </v-card>
      </v-flex>

      <br />

      <v-expansion-panels
        v-model="panel"
        :readonly="readonly"
        multiple
        dark
        color="#322D6C"
      >
        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Cuál el es objetivo de esta web?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Hay 2 objetivos principales. Por un lado, recomendar la mejor
            táctica a un equipo. Por el otro, se recomendarán jugadores que
            puedan cubrir los puestos más débiles en la
            alineación.</v-expansion-panel-content
          >
        </v-expansion-panel>

    
        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Para qué sirve la página de formaciones?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >En este apartado de la página web, el usuario podrá elegir la
            formación en la que juega su equipo.</v-expansion-panel-content
          >
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Cómo elijo los atributos de los jugadores de mi
            plantilla?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Una vez elegida la formación que se va a utilizar, lo que se va a
            hacer es, mediante unos sliders, poner el nombre, el apellido y las
            estadísticas de cada jugador.</v-expansion-panel-content
          >
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Para qué sirven las medias en cada
            atributo?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Por una parte, sirven para que el usuario se haga una idea de cómo
            se encuentra su equipo. Por otra parte, el programa calculará la
            mejor estrategia a partir de estas
            estadísticas.</v-expansion-panel-content
          >
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué son los números debajo de cada táctica?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Es el rating que le da a tu equipo la página web para cada una de
            las tácticas, por lo que, a mayor valor, más recomendada está esa
            táctica.</v-expansion-panel-content
          >
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué información se muestra al pulsar en los 
            desplegables que tienen posiciones de jugadores?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Se muestra la adecuación que tiene cada jugador a cada
            una de las 6 tácticas disponibles en la página web.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué pasa no se selecciona la opción de 
            elegir el valor del jugador?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Por defecto, la aplicación tiene seleccionado el mayor precio, 
            así que se buscarán jugadores que tengan el rango más elevado de precios.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué se muestra al pulsar el botón
             de recomendación automática?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Se mostrará un jugador por cada una de las posiciones
            que hay en la formación que se encuentre en el rango de 
            precios establecido y cuya táctica favorita sea la adecuada.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué pasa si al pulsar el botón de recomendación
            automática no sale ningún desplegable debajo?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Posiblemente se haya producido un error que puede
            ser o bien debido a la conexión con la base de 
            datos o bien con el backend de la aplicación,
            por lo que se deberá contactar a los administradores
            de la web.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa VEL?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Velocidad - La rapidez de movimiento de un jugador.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa RES?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Resistencia - El aguante de un jugador en el campo de juego.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa FUE?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Fuerza - La fortaleza física de un jugador.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa REM?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Remate - La capacidad de tiro de un jugador delante de la portería.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa PAS?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Pase - La capacidad de pasarle el balón a un compañero de equipo.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa REG?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Regate - La habilidad de un jugador a la hora de manejar el balón.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa MAR?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Marcaje - La capacidad de un jugador de seguir a un rival adecuadamente.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa ENT?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Entradas - La habilidad de un jugador para robar el balón al enemigo.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa CAB?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Cabeza - El remate de cabeza de un jugador.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa DEC?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Decisiones - La capacidad de un jugador de tomar la decisión correcta.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa COL?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Colocación - La capacidad de un jugador de encontrarse en la posición correcta.</v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel dark color="#322D6C">
          <v-expansion-panel-header dark color="#322D6C"
            >¿Qué significa PAR?</v-expansion-panel-header
          >
          <v-expansion-panel-content dark color="#322D6C"
            >Paradas - La capacidad de un portero de realizar paradas.</v-expansion-panel-content>
        </v-expansion-panel>


      </v-expansion-panels>
      <br />
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
            <a
              color="#00F7FF"
              target="_blank"
              href="http://code.meta-platform.com/assets/mdi/preview.html"
              >code.meta-platform</a
            >
          </h1>
        </v-col>
      </v-footer>
    </v-card>
  </v-container>
</template>



<script>
export default {
  data: () => ({
    email:
      "Para contactar con los creadores utilizar el siguiente correo electrónico: panicodelkernel@gmail.com",

    multiLine: true,
    snackbar: false,
    snackbar2: false,
    

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




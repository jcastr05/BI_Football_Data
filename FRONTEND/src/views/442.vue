<template>
  <v-container dark class="blue-grey darken-4" fluid grid-list-md>
    <v-card color="#25214F" dark>
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
      <v-layout row wrap align-center>
        <v-flex xs4 sm4 md4>
          <v-card-title primary class="align-center">{{
            formacion
          }}</v-card-title>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <center>
            <br />
            <v-img height="500" width="400" src="../assets/4-4-2.png"></v-img>
            <br />
            <br />
          </center>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-card-title primary class="align-center"
            >{{ casoFormacion }}
          </v-card-title>
          <v-card-title primary class="align-center">{{
            ordenPosiciones
          }}</v-card-title>
        </v-flex>
      </v-layout>

      <!-- PO -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            portero
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad.val"
            :label="edad.label"
            :thumb-color="edad.color"
            :color="edad.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad.val"
            :label="velocidad.label"
            :thumb-color="velocidad.color"
            :color="velocidad.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia.val"
            :label="resistencia.label"
            :thumb-color="resistencia.color"
            :color="resistencia.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza.val"
            :label="fuerza.label"
            :thumb-color="fuerza.color"
            :color="fuerza.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate.val"
            :label="remate.label"
            :thumb-color="remate.color"
            :color="remate.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase.val"
            :label="pase.label"
            :thumb-color="pase.color"
            :color="pase.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate.val"
            :label="regate.label"
            :thumb-color="regate.color"
            :color="regate.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje.val"
            :label="marcaje.label"
            :thumb-color="marcaje.color"
            :color="marcaje.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas.val"
            :label="entradas.label"
            :thumb-color="entradas.color"
            :color="entradas.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza.val"
            :label="cabeza.label"
            :thumb-color="cabeza.color"
            :color="cabeza.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones.val"
            :label="decisiones.label"
            :thumb-color="decisiones.color"
            :color="decisiones.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion.val"
            :label="colocacion.label"
            :thumb-color="colocacion.color"
            :color="colocacion.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas.val"
            :label="paradas.label"
            :thumb-color="paradas.color"
            :color="paradas.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />

      <!-- LI -->





      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            lateralIzquierdo
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad2.val"
            :label="edad2.label"
            :thumb-color="edad2.color"
            :color="edad2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad2.val"
            :label="velocidad2.label"
            :thumb-color="velocidad2.color"
            :color="velocidad2.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia2.val"
            :label="resistencia2.label"
            :thumb-color="resistencia2.color"
            :color="resistencia2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza2.val"
            :label="fuerza2.label"
            :thumb-color="fuerza2.color"
            :color="fuerza2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate2.val"
            :label="remate2.label"
            :thumb-color="remate2.color"
            :color="remate2.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase2.val"
            :label="pase2.label"
            :thumb-color="pase2.color"
            :color="pase2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate2.val"
            :label="regate2.label"
            :thumb-color="regate2.color"
            :color="regate2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje2.val"
            :label="marcaje2.label"
            :thumb-color="marcaje2.color"
            :color="marcaje2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas2.val"
            :label="entradas2.label"
            :thumb-color="entradas2.color"
            :color="entradas2.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza2.val"
            :label="cabeza2.label"
            :thumb-color="cabeza2.color"
            :color="cabeza2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones2.val"
            :label="decisiones2.label"
            :thumb-color="decisiones2.color"
            :color="decisiones2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion2.val"
            :label="colocacion2.label"
            :thumb-color="colocacion2.color"
            :color="colocacion2.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas2.val"
            :label="paradas2.label"
            :thumb-color="paradas2.color"
            :color="paradas2.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- DC -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            defensa
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad3.val"
            :label="edad3.label"
            :thumb-color="edad3.color"
            :color="edad3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad3.val"
            :label="velocidad3.label"
            :thumb-color="velocidad3.color"
            :color="velocidad3.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia3.val"
            :label="resistencia3.label"
            :thumb-color="resistencia3.color"
            :color="resistencia3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza3.val"
            :label="fuerza3.label"
            :thumb-color="fuerza3.color"
            :color="fuerza3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate3.val"
            :label="remate3.label"
            :thumb-color="remate3.color"
            :color="remate3.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase3.val"
            :label="pase3.label"
            :thumb-color="pase3.color"
            :color="pase3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate3.val"
            :label="regate3.label"
            :thumb-color="regate3.color"
            :color="regate3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje3.val"
            :label="marcaje3.label"
            :thumb-color="marcaje3.color"
            :color="marcaje3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas3.val"
            :label="entradas3.label"
            :thumb-color="entradas3.color"
            :color="entradas3.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza3.val"
            :label="cabeza3.label"
            :thumb-color="cabeza3.color"
            :color="cabeza3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones3.val"
            :label="decisiones3.label"
            :thumb-color="decisiones3.color"
            :color="decisiones3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion3.val"
            :label="colocacion3.label"
            :thumb-color="colocacion3.color"
            :color="colocacion3.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas3.val"
            :label="paradas3.label"
            :thumb-color="paradas3.color"
            :color="paradas3.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- DC -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            defensa
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad4.val"
            :label="edad4.label"
            :thumb-color="edad4.color"
            :color="edad4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad4.val"
            :label="velocidad4.label"
            :thumb-color="velocidad4.color"
            :color="velocidad4.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia4.val"
            :label="resistencia4.label"
            :thumb-color="resistencia4.color"
            :color="resistencia4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza4.val"
            :label="fuerza4.label"
            :thumb-color="fuerza4.color"
            :color="fuerza4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate4.val"
            :label="remate4.label"
            :thumb-color="remate4.color"
            :color="remate4.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase4.val"
            :label="pase4.label"
            :thumb-color="pase4.color"
            :color="pase4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate4.val"
            :label="regate4.label"
            :thumb-color="regate4.color"
            :color="regate4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje4.val"
            :label="marcaje4.label"
            :thumb-color="marcaje4.color"
            :color="marcaje4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas4.val"
            :label="entradas4.label"
            :thumb-color="entradas4.color"
            :color="entradas4.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza4.val"
            :label="cabeza4.label"
            :thumb-color="cabeza4.color"
            :color="cabeza4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones4.val"
            :label="decisiones4.label"
            :thumb-color="decisiones4.color"
            :color="decisiones4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion4.val"
            :label="colocacion4.label"
            :thumb-color="colocacion4.color"
            :color="colocacion4.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas4.val"
            :label="paradas4.label"
            :thumb-color="paradas4.color"
            :color="paradas4.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- LD -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            lateralDerecho
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad5.val"
            :label="edad5.label"
            :thumb-color="edad5.color"
            :color="edad5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad5.val"
            :label="velocidad5.label"
            :thumb-color="velocidad5.color"
            :color="velocidad5.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia5.val"
            :label="resistencia5.label"
            :thumb-color="resistencia5.color"
            :color="resistencia5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza5.val"
            :label="fuerza5.label"
            :thumb-color="fuerza5.color"
            :color="fuerza5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate5.val"
            :label="remate5.label"
            :thumb-color="remate5.color"
            :color="remate5.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase5.val"
            :label="pase5.label"
            :thumb-color="pase5.color"
            :color="pase5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate5.val"
            :label="regate5.label"
            :thumb-color="regate5.color"
            :color="regate5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje5.val"
            :label="marcaje5.label"
            :thumb-color="marcaje5.color"
            :color="marcaje5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas5.val"
            :label="entradas5.label"
            :thumb-color="entradas5.color"
            :color="entradas5.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza5.val"
            :label="cabeza5.label"
            :thumb-color="cabeza5.color"
            :color="cabeza5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones5.val"
            :label="decisiones5.label"
            :thumb-color="decisiones5.color"
            :color="decisiones5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion5.val"
            :label="colocacion5.label"
            :thumb-color="colocacion5.color"
            :color="colocacion5.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas5.val"
            :label="paradas5.label"
            :thumb-color="paradas5.color"
            :color="paradas5.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- II -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{ interiorIzquierdo }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad6.val"
            :label="edad6.label"
            :thumb-color="edad6.color"
            :color="edad6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad6.val"
            :label="velocidad6.label"
            :thumb-color="velocidad6.color"
            :color="velocidad6.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia6.val"
            :label="resistencia6.label"
            :thumb-color="resistencia6.color"
            :color="resistencia6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza6.val"
            :label="fuerza6.label"
            :thumb-color="fuerza6.color"
            :color="fuerza6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate6.val"
            :label="remate6.label"
            :thumb-color="remate6.color"
            :color="remate6.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase6.val"
            :label="pase6.label"
            :thumb-color="pase6.color"
            :color="pase6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate6.val"
            :label="regate6.label"
            :thumb-color="regate6.color"
            :color="regate6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje6.val"
            :label="marcaje6.label"
            :thumb-color="marcaje6.color"
            :color="marcaje6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas6.val"
            :label="entradas6.label"
            :thumb-color="entradas6.color"
            :color="entradas6.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza6.val"
            :label="cabeza6.label"
            :thumb-color="cabeza6.color"
            :color="cabeza6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones6.val"
            :label="decisiones6.label"
            :thumb-color="decisiones6.color"
            :color="decisiones6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion6.val"
            :label="colocacion6.label"
            :thumb-color="colocacion6.color"
            :color="colocacion6.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas6.val"
            :label="paradas6.label"
            :thumb-color="paradas6.color"
            :color="paradas6.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- MC -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            mediocentro
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad7.val"
            :label="edad7.label"
            :thumb-color="edad7.color"
            :color="edad7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad7.val"
            :label="velocidad7.label"
            :thumb-color="velocidad7.color"
            :color="velocidad7.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia7.val"
            :label="resistencia7.label"
            :thumb-color="resistencia7.color"
            :color="resistencia7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza7.val"
            :label="fuerza7.label"
            :thumb-color="fuerza7.color"
            :color="fuerza7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate7.val"
            :label="remate7.label"
            :thumb-color="remate7.color"
            :color="remate7.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase7.val"
            :label="pase7.label"
            :thumb-color="pase7.color"
            :color="pase7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate7.val"
            :label="regate7.label"
            :thumb-color="regate7.color"
            :color="regate7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje7.val"
            :label="marcaje7.label"
            :thumb-color="marcaje7.color"
            :color="marcaje7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas7.val"
            :label="entradas7.label"
            :thumb-color="entradas7.color"
            :color="entradas7.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza7.val"
            :label="cabeza7.label"
            :thumb-color="cabeza7.color"
            :color="cabeza7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones7.val"
            :label="decisiones7.label"
            :thumb-color="decisiones7.color"
            :color="decisiones7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion7.val"
            :label="colocacion7.label"
            :thumb-color="colocacion7.color"
            :color="colocacion7.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas7.val"
            :label="paradas7.label"
            :thumb-color="paradas7.color"
            :color="paradas7.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- MC -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            mediocentro
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad8.val"
            :label="edad8.label"
            :thumb-color="edad8.color"
            :color="edad8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad8.val"
            :label="velocidad8.label"
            :thumb-color="velocidad8.color"
            :color="velocidad8.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia8.val"
            :label="resistencia8.label"
            :thumb-color="resistencia8.color"
            :color="resistencia8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza8.val"
            :label="fuerza8.label"
            :thumb-color="fuerza8.color"
            :color="fuerza8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate8.val"
            :label="remate8.label"
            :thumb-color="remate8.color"
            :color="remate8.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase8.val"
            :label="pase8.label"
            :thumb-color="pase8.color"
            :color="pase8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate8.val"
            :label="regate8.label"
            :thumb-color="regate8.color"
            :color="regate8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje8.val"
            :label="marcaje8.label"
            :thumb-color="marcaje8.color"
            :color="marcaje8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas8.val"
            :label="entradas8.label"
            :thumb-color="entradas8.color"
            :color="entradas8.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza8.val"
            :label="cabeza8.label"
            :thumb-color="cabeza8.color"
            :color="cabeza8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones8.val"
            :label="decisiones8.label"
            :thumb-color="decisiones8.color"
            :color="decisiones8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion8.val"
            :label="colocacion8.label"
            :thumb-color="colocacion8.color"
            :color="colocacion8.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas8.val"
            :label="paradas8.label"
            :thumb-color="paradas8.color"
            :color="paradas8.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- ID -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            interiorDerecho
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad9.val"
            :label="edad9.label"
            :thumb-color="edad9.color"
            :color="edad9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad9.val"
            :label="velocidad9.label"
            :thumb-color="velocidad9.color"
            :color="velocidad9.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia9.val"
            :label="resistencia9.label"
            :thumb-color="resistencia9.color"
            :color="resistencia9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza9.val"
            :label="fuerza9.label"
            :thumb-color="fuerza9.color"
            :color="fuerza9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate9.val"
            :label="remate9.label"
            :thumb-color="remate9.color"
            :color="remate9.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase9.val"
            :label="pase9.label"
            :thumb-color="pase9.color"
            :color="pase9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate9.val"
            :label="regate9.label"
            :thumb-color="regate9.color"
            :color="regate9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje9.val"
            :label="marcaje9.label"
            :thumb-color="marcaje9.color"
            :color="marcaje9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas9.val"
            :label="entradas9.label"
            :thumb-color="entradas9.color"
            :color="entradas9.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza9.val"
            :label="cabeza9.label"
            :thumb-color="cabeza9.color"
            :color="cabeza9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones9.val"
            :label="decisiones9.label"
            :thumb-color="decisiones9.color"
            :color="decisiones9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion9.val"
            :label="colocacion9.label"
            :thumb-color="colocacion9.color"
            :color="colocacion9.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas9.val"
            :label="paradas9.label"
            :thumb-color="paradas9.color"
            :color="paradas9.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <!-- DL -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            delantero
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad10.val"
            :label="edad10.label"
            :thumb-color="edad10.color"
            :color="edad10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad10.val"
            :label="velocidad10.label"
            :thumb-color="velocidad10.color"
            :color="velocidad10.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia10.val"
            :label="resistencia10.label"
            :thumb-color="resistencia10.color"
            :color="resistencia10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza10.val"
            :label="fuerza10.label"
            :thumb-color="fuerza10.color"
            :color="fuerza10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate10.val"
            :label="remate10.label"
            :thumb-color="remate10.color"
            :color="remate10.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase10.val"
            :label="pase10.label"
            :thumb-color="pase10.color"
            :color="pase10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate10.val"
            :label="regate10.label"
            :thumb-color="regate10.color"
            :color="regate10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje10.val"
            :label="marcaje10.label"
            :thumb-color="marcaje10.color"
            :color="marcaje10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas10.val"
            :label="entradas10.label"
            :thumb-color="entradas10.color"
            :color="entradas10.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza10.val"
            :label="cabeza10.label"
            :thumb-color="cabeza10.color"
            :color="cabeza10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones10.val"
            :label="decisiones10.label"
            :thumb-color="decisiones10.color"
            :color="decisiones10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion10.val"
            :label="colocacion10.label"
            :thumb-color="colocacion10.color"
            :color="colocacion10.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas10.val"
            :label="paradas10.label"
            :thumb-color="paradas10.color"
            :color="paradas10.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

<!-- DL -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-card-title primary class="align-center">{{
            delantero
          }}</v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nombre del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Apellido del jugador"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 md4>
          <v-slider
            max="45"
            min="15"
            v-model="edad11.val"
            :label="edad11.label"
            :thumb-color="edad11.color"
            :color="edad11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>

      <br />
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="velocidad11.val"
            :label="velocidad11.label"
            :thumb-color="velocidad11.color"
            :color="velocidad11.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="resistencia11.val"
            :label="resistencia11.label"
            :thumb-color="resistencia11.color"
            :color="resistencia11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="fuerza11.val"
            :label="fuerza11.label"
            :thumb-color="fuerza11.color"
            :color="fuerza11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="remate11.val"
            :label="remate11.label"
            :thumb-color="remate11.color"
            :color="remate11.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="pase11.val"
            :label="pase11.label"
            :thumb-color="pase11.color"
            :color="pase11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="regate11.val"
            :label="regate11.label"
            :thumb-color="regate11.color"
            :color="regate11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="marcaje11.val"
            :label="marcaje11.label"
            :thumb-color="marcaje11.color"
            :color="marcaje11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="entradas11.val"
            :label="entradas11.label"
            :thumb-color="entradas11.color"
            :color="entradas11.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="cabeza11.val"
            :label="cabeza11.label"
            :thumb-color="cabeza11.color"
            :color="cabeza11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />

      <v-layout>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="decisiones11.val"
            :label="decisiones11.label"
            :thumb-color="decisiones11.color"
            :color="decisiones11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="colocacion11.val"
            :label="colocacion11.label"
            :thumb-color="colocacion11.color"
            :color="colocacion11.color"
            thumb-label="always"
          ></v-slider> </v-flex
        ><v-flex xs4 sm4 md4>
          <v-slider
            max="20"
            min="1"
            v-model="paradas11.val"
            :label="paradas11.label"
            :thumb-color="paradas11.color"
            :color="paradas11.color"
            thumb-label="always"
          ></v-slider>
        </v-flex>
      </v-layout>
      <br />
      
      <v-btn v-on:click="changeData()" block color="#655dbb">
        MOSTRAR RECOMENDACIONES
      </v-btn>
      <br />

      <v-layout v-if="showData">
        <v-expansion-panels
          v-model="panel"
          :readonly="readonly"
          multiple
          dark
          color="#322D6C"
        >
          <v-expansion-panel>
            <v-expansion-panel-header dark color="#322D6C">{{
              mediasTexto
            }}</v-expansion-panel-header>
            <v-expansion-panel-content dark color="#322D6C">
              <v-layout v-if="showData">
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#990E4F"
                    v-model="mediaVelocidad"
                    label="VEL"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#CC185B"
                    v-model="mediaResistencia"
                    label="RES"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#FF1E63"
                    v-model="mediaFuerza"
                    label="FUE"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="showData">
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#8600B3"
                    v-model="mediaRemate"
                    label="REM"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#9900CC"
                    v-model="mediaPase"
                    label="PAS"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#CC33FF"
                    v-model="mediaRegate"
                    label="REG"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="showData">
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#0073E6"
                    v-model="mediaMarcaje"
                    label="MAR"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#1A8CFF"
                    v-model="mediaEntradas"
                    label="ENT"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#4DA6FF	"
                    v-model="mediaCabeza"
                    label="CAB"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="showData">
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#269900"
                    v-model="mediaDecisiones"
                    label="DEC"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#33CC00"
                    v-model="mediaColocacion"
                    label="COL"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#40FF00"
                    v-model="mediaParadas"
                    label="PAR"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>

      <br />
      <v-layout v-if="showData">
        <v-expansion-panels
          v-model="panel"
          :readonly="readonly"
          multiple
          dark
          color="#322D6C"
        >
          <v-expansion-panel>
            <v-expansion-panel-header dark color="#322D6C">{{
              recomendacionesTexto
            }}</v-expansion-panel-header>
            <v-expansion-panel-content dark color="#322D6C">
              <v-layout v-if="showData">
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#FFEB3B"
                    v-model="posLentaRec"
                    label="POSESIÓN LENTA"
                    outlined
                    readonly
                    name="caca"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#FF9800"
                    v-model="posRapidaRec"
                    label="POSESIÓN RÁPIDA"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#E91E63"
                    v-model="gegenRec"
                    label="GEGENPRESSING"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="showData">
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#76FF03"
                    v-model="wingPlayRec"
                    label="POR BANDAS"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#18FFFF"
                    v-model="counterRec"
                    label="CONTRAATAQUE"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    color="#D500F9"
                    v-model="catenaccionRec"
                    label="CATENACCIO"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
      <br />

      <v-layout v-if="showData">
        <v-expansion-panels
          v-model="panel"
          :readonly="readonly"
          multiple
          dark
          color="#322D6C"
        >
          <v-expansion-panel>
            <v-expansion-panel-header dark color="#322D6C">{{
              recomenTexto
            }}</v-expansion-panel-header>
            <v-expansion-panel-content dark color="#322D6C">
              <v-flex xs12 sm12 md12>
                <v-text-field
                  color="#00B0FF"
                  v-model="textoRecomendatorio"
                  label="RECOMENDACIÓN DE ESTRATEGIA"
                  outlined
                  readonly
                  block
                ></v-text-field>
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
      <br>


      <v-layout v-if="showData">
        <v-expansion-panels
          v-model="panel"
          :readonly="readonly"
          multiple
          dark
          color="#322D6C"
        >
          <v-expansion-panel>
            <v-expansion-panel-header dark color="#322D6C">{{
              textoTexto
            }}</v-expansion-panel-header>
            <v-expansion-panel-content dark color="#322D6C">
        <v-flex xs12 sm12 md12>
          <v-textarea
            color="#607888"
            v-model="explicacionRecomendacionTactica"
            label="EXPLICACIÓN DE LA ESTRATEGIA"
            outlined
            readonly
            block
          ></v-textarea>
        </v-flex>
        </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
      <br>
      
    </v-card>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    texto:
      "Esta página web tiene el principal objetivo de ayudar a los entrenadores a saber cuáles son las fortalezas y debilidades de su equipo, de decidir cuál es la mejor táctica y de recomendar nuevos fichajes para el equipo.",
    valid: false,
    mediaPase: 20,
    mediaVelocidad: 20,
    mediaResistencia: 20,
    mediaFuerza: 20,
    mediaRemate: 20,
    mediaRegate: 20,
    mediaMarcaje: 20,
    mediaEntradas: 20,
    mediaCabeza: 20,
    mediaDecisiones: 20,
    mediaParadas: 20,
    posRapidaRec: 0.0,
    posLentaRec: 0.0,
    gegenRec: 0.0,
    counterRec: 0.0,
    wingPlayRec: 0.0,
    catenaccionRec: 0.0,
    textoRecomendatorio: "El estilo recomendado es posesión rápida",
    recomendacionesTexto:
      "Ahora se van a desglosar las recomendaciones para cada una de las 6 estrategias posibles:",
      recomenTexto: "Aquí se va a mostrar la estrategia recomendada:",
    textoTexto: "Esta es la explicación de la estrategia elegida:",
    showData: false,
    mediasTexto:
      "Lo primero que se va a mostrar son las medias de cada atributo:",
    formacion: "FORMACIÓN ELEGIDA: 4-4-2",
    casoFormacion:
      "En el caso de la formación 4-4-2 el orden de elección será el siguiente:",
    ordenPosiciones: "PO-LI-DC-DC-LD-II-MC-MC-ID-DL-DL",
    firstname: "",
    lastname: "",
    portero: "PORTERO",
    lateralDerecho: "LATERAL DERECHO",
    lateralIzquierdo: "LATERAL IZQUIERDO",
    defensa: "DEFENSA CENTRAL",
    pivote: "PIVOTE",
    mediocentro: "MEDIOCENTRO",
    mediapunta: "MEDIAPUNTA",
    interiorDerecho: "INTERIOR DERECHO",
    interiorIzquierdo: "INTERIOR IZQUIERDO",
    extremoDerecho: "EXTREMO DERECHO",
    extremoIzquierdo: "EXTREMO IZQUIERDO",
    delantero: "DELANTERO",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],

    pase: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza: { label: "FUE", val: 50, color: "pink" },
    resistencia: { label: "RES", val: 50, color: "pink darken-2" },
    remate: { label: "REM", val: 50, color: "purple darken-4" },
    regate: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion: { label: "COL", val: 50, color: "green darken-2" },
    paradas: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad: { label: "EDA", val: 50, color: "orange darken-4" },

    pase2: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad2: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza2: { label: "FUE", val: 50, color: "pink" },
    resistencia2: { label: "RES", val: 50, color: "pink darken-2" },
    remate2: { label: "REM", val: 50, color: "purple darken-4" },
    regate2: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje2: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas2: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza2: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones2: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion2: { label: "COL", val: 50, color: "green darken-2" },
    paradas2: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad2: { label: "EDA", val: 50, color: "orange darken-4" },

    pase3: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad3: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza3: { label: "FUE", val: 50, color: "pink" },
    resistencia3: { label: "RES", val: 50, color: "pink darken-2" },
    remate3: { label: "REM", val: 50, color: "purple darken-4" },
    regate3: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje3: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas3: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza3: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones3: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion3: { label: "COL", val: 50, color: "green darken-2" },
    paradas3: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad3: { label: "EDA", val: 50, color: "orange darken-4" },

    pase4: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad4: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza4: { label: "FUE", val: 50, color: "pink" },
    resistencia4: { label: "RES", val: 50, color: "pink darken-2" },
    remate4: { label: "REM", val: 50, color: "purple darken-4" },
    regate4: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje4: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas4: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza4: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones4: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion4: { label: "COL", val: 50, color: "green darken-2" },
    paradas4: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad4: { label: "EDA", val: 50, color: "orange darken-4" },

    pase5: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad5: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza5: { label: "FUE", val: 50, color: "pink" },
    resistencia5: { label: "RES", val: 50, color: "pink darken-2" },
    remate5: { label: "REM", val: 50, color: "purple darken-4" },
    regate5: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje5: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas5: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza5: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones5: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion5: { label: "COL", val: 50, color: "green darken-2" },
    paradas5: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad5: { label: "EDA", val: 50, color: "orange darken-4" },

    pase6: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad6: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza6: { label: "FUE", val: 50, color: "pink" },
    resistencia6: { label: "RES", val: 50, color: "pink darken-2" },
    remate6: { label: "REM", val: 50, color: "purple darken-4" },
    regate6: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje6: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas6: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza6: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones6: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion6: { label: "COL", val: 50, color: "green darken-2" },
    paradas6: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad6: { label: "EDA", val: 50, color: "orange darken-4" },

    pase7: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad7: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza7: { label: "FUE", val: 50, color: "pink" },
    resistencia7: { label: "RES", val: 50, color: "pink darken-2" },
    remate7: { label: "REM", val: 50, color: "purple darken-4" },
    regate7: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje7: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas7: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza7: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones7: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion7: { label: "COL", val: 50, color: "green darken-2" },
    paradas7: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad7: { label: "EDA", val: 50, color: "orange darken-4" },

    pase8: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad8: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza8: { label: "FUE", val: 50, color: "pink" },
    resistencia8: { label: "RES", val: 50, color: "pink darken-2" },
    remate8: { label: "REM", val: 50, color: "purple darken-4" },
    regate8: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje8: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas8: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza8: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones8: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion8: { label: "COL", val: 50, color: "green darken-2" },
    paradas8: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad8: { label: "EDA", val: 50, color: "orange darken-4" },

    pase9: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad9: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza9: { label: "FUE", val: 50, color: "pink" },
    resistencia9: { label: "RES", val: 50, color: "pink darken-2" },
    remate9: { label: "REM", val: 50, color: "purple darken-4" },
    regate9: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje9: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas9: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza9: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones9: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion9: { label: "COL", val: 50, color: "green darken-2" },
    paradas9: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad9: { label: "EDA", val: 50, color: "orange darken-4" },

    
    pase10: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad10: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza10: { label: "FUE", val: 50, color: "pink" },
    resistencia10: { label: "RES", val: 50, color: "pink darken-2" },
    remate10: { label: "REM", val: 50, color: "purple darken-4" },
    regate10: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje10: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas10: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza10: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones10: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion10: { label: "COL", val: 50, color: "green darken-2" },
    paradas10: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad10: { label: "EDA", val: 50, color: "orange darken-4" },


    pase11: { label: "PAS", val: 50, color: "purple darken-3" },
    velocidad11: { label: "VEL", val: 50, color: "pink darken-4" },
    fuerza11: { label: "FUE", val: 50, color: "pink" },
    resistencia11: { label: "RES", val: 50, color: "pink darken-2" },
    remate11: { label: "REM", val: 50, color: "purple darken-4" },
    regate11: { label: "REG", val: 50, color: "purple darken-1" },
    marcaje11: { label: "MAR", val: 50, color: "light-blue darken-4" },
    entradas11: { label: "ENT", val: 50, color: "light-blue darken-3" },
    cabeza11: { label: "CAB", val: 50, color: "light-blue darken-1" },
    decisiones11: { label: "DEC", val: 50, color: "green darken-4" },
    colocacion11: { label: "COL", val: 50, color: "green darken-2" },
    paradas11: { label: "PAR", val: 50, color: "light-green accent-4" },
    edad11: { label: "EDA", val: 50, color: "orange darken-4" },

  }),
    methods: {
    changeData() {
      this.showData = true;
      this.mediaPase = Math.round(
        (this.pase.val +
          this.pase2.val +
          this.pase3.val +
          this.pase4.val +
          this.pase5.val +
          this.pase6.val +
          this.pase7.val +
          this.pase8.val +
          this.pase9.val +
          this.pase10.val +
          this.pase11.val) /
          11
      );
      this.mediaVelocidad = Math.round(
        (this.velocidad.val +
          this.velocidad2.val +
          this.velocidad3.val +
          this.velocidad4.val +
          this.velocidad5.val +
          this.velocidad6.val +
          this.velocidad7.val +
          this.velocidad8.val +
          this.velocidad9.val +
          this.velocidad10.val +
          this.velocidad11.val) /
          11
      );
      this.mediaResistencia = Math.round(
        (this.resistencia.val +
          this.resistencia2.val +
          this.resistencia3.val +
          this.resistencia4.val +
          this.resistencia5.val +
          this.resistencia6.val +
          this.resistencia7.val +
          this.resistencia8.val +
          this.resistencia9.val +
          this.resistencia10.val +
          this.resistencia11.val) /
          11
      );
      this.mediaFuerza = Math.round(
        (this.fuerza.val +
          this.fuerza2.val +
          this.fuerza3.val +
          this.fuerza4.val +
          this.fuerza5.val +
          this.fuerza6.val +
          this.fuerza7.val +
          this.fuerza8.val +
          this.fuerza9.val +
          this.fuerza10.val +
          this.fuerza11.val) /
          11
      );
      this.mediaRemate = Math.round(
        (this.remate.val +
          this.remate2.val +
          this.remate3.val +
          this.remate4.val +
          this.remate5.val +
          this.remate6.val +
          this.remate7.val +
          this.remate8.val +
          this.remate9.val +
          this.remate10.val +
          this.remate11.val) /
          11
      );
      this.mediaRegate = Math.round(
        (this.regate.val +
          this.regate2.val +
          this.regate3.val +
          this.regate4.val +
          this.regate5.val +
          this.regate6.val +
          this.regate7.val +
          this.regate8.val +
          this.regate9.val +
          this.regate10.val +
          this.regate11.val) /
          11
      );
      this.mediaMarcaje = Math.round(
        (this.marcaje.val +
          this.marcaje2.val +
          this.marcaje3.val +
          this.marcaje4.val +
          this.marcaje5.val +
          this.marcaje6.val +
          this.marcaje7.val +
          this.marcaje8.val +
          this.marcaje9.val +
          this.marcaje10.val +
          this.marcaje11.val) /
          11
      );
      this.mediaEntradas = Math.round(
        (this.entradas.val +
          this.entradas2.val +
          this.entradas3.val +
          this.entradas4.val +
          this.entradas5.val +
          this.entradas6.val +
          this.entradas7.val +
          this.entradas8.val +
          this.entradas9.val +
          this.entradas10.val +
          this.entradas11.val) /
          11
      );
      this.mediaCabeza = Math.round(
        (this.cabeza.val +
          this.cabeza2.val +
          this.cabeza3.val +
          this.cabeza4.val +
          this.cabeza5.val +
          this.cabeza6.val +
          this.cabeza7.val +
          this.cabeza8.val +
          this.cabeza9.val +
          this.cabeza10.val +
          this.cabeza11.val) /
          11
      );
      this.mediaDecisiones = Math.round(
        (this.decisiones.val +
          this.decisiones2.val +
          this.decisiones3.val +
          this.decisiones4.val +
          this.decisiones5.val +
          this.decisiones6.val +
          this.decisiones7.val +
          this.decisiones8.val +
          this.decisiones9.val +
          this.decisiones10.val +
          this.decisiones11.val) /
          11
      );
      this.mediaColocacion = Math.round(
        (this.colocacion.val +
          this.colocacion2.val +
          this.colocacion3.val +
          this.colocacion4.val +
          this.colocacion5.val +
          this.colocacion6.val +
          this.colocacion7.val +
          this.colocacion8.val +
          this.colocacion9.val +
          this.colocacion10.val +
          this.colocacion11.val) /
          11
      );
      this.mediaParadas = Math.round(
        (this.paradas.val +
          this.paradas2.val +
          this.paradas3.val +
          this.paradas4.val +
          this.paradas5.val +
          this.paradas6.val +
          this.paradas7.val +
          this.paradas8.val +
          this.paradas9.val +
          this.paradas10.val +
          this.paradas11.val) /
          11
      );
      var velx = parseFloat(this.mediaVelocidad)/14.5
      var resx = parseFloat(this.mediaResistencia)/12.5
      var fuex = parseFloat(this.mediaFuerza)/13
      var remx = parseFloat(this.mediaRemate)/10.5
      var pasx = parseFloat(this.mediaPase)/12.5
      var regx = parseFloat(this.mediaRegate)/12
      var marx = parseFloat(this.mediaMarcaje)/9.5
      var entx = parseFloat(this.mediaEntradas)/9.5
      var cabx = parseFloat(this.mediaCabeza)/10.5
      var decx = parseFloat(this.mediaDecisiones)/12.5
      var colx = parseFloat(this.mediaColocacion)/12.5
      var parx = (parseFloat(this.mediaParadas)*11-10)/15
      
      this.posRapidaRec = 0.06*velx+0.06*resx+0.06*fuex+0.08*remx+0.15*pasx+0.10*regx+0.08*marx+0.07*entx+0.07*cabx+0.1*decx+0.12*colx+0.05*parx
      this.posLentaRec = 0.1*velx+0.08*resx+0.05*fuex+0.1*remx+0.12*pasx+0.10*regx+0.08*marx+0.07*entx+0.05*cabx+0.12*decx+0.08*colx+0.05*parx
      this.gegenRec = 0.09*velx+0.15*resx+0.07*fuex+0.08*remx+0.08*pasx+0.08*regx+0.08*marx+0.07*entx+0.05*cabx+0.08*decx+0.12*colx+0.05*parx
      this.counterRec = 0.15*velx+0.07*resx+0.07*fuex+0.08*remx+0.07*pasx+0.09*regx+0.08*marx+0.08*entx+0.05*cabx+0.1*decx+0.1*colx+0.06*parx
      this.wingPlayRec = 0.12*velx+0.05*resx+0.1*fuex+0.08*remx+0.08*pasx+0.1*regx+0.08*marx+0.08*entx+0.10*cabx+0.07*decx+0.08*colx+0.06*parx
      this.catenaccionRec = 0.08*velx+0.07*resx+0.1*fuex+0.07*remx+0.07*pasx+0.08*regx+0.08*marx+0.08*entx+0.08*cabx+0.12*decx+0.1*colx+0.06*parx

       var maximo = this.posRapidaRec
        this.explicacionRecomendacionTactica = "En el estilo de posesión rápida, si bien se intentará mantener el control del balón la mayoría de las veces, en los momentos en los que se pueda realizar un ataque rápido se realizará. La zona de juego normalmente será por el centro, si bien se utilizarán las bandas para dar profundidad al equipo. En ataque la mentalidad será ofensiva, subiendo a atacar la mayoría de los jugadores del equipo. En defensa, se realizará una presión intensa para recuperar el balón lo antes posible."
        if(this.posLentaRec>maximo){ 
        maximo = this.posLentaRec
        this.textoRecomendatorio = "El estilo recomendado es posesión lenta."
        this.explicacionRecomendacionTactica = "En el estilo de posesión lenta, la principal característica es que en todo momento intentaremos mantener el balón en nuestro poder, normalmente mediante pases de poco riesgo, no realizando pases largos salvo en ocasiones claras de gol, y jugando principalmente por el centro. En ataque, la mentalidad del equipo será ofensiva, ya que se intentará hacer que nuestro equipo no pierda el control del balón en ningún momento. En defensa, se optará por presionar al rival para que pierda la pelota lo antes posible."
        }

        if(this.gegenRec>maximo){ 
        maximo = this.gegenRec
        this.textoRecomendatorio = "El estilo recomendado es gegenpressing."
        this.explicacionRecomendacionTactica = "En el estilo de gegenpressing, todos los jugadores del equipo participarán en una presión intensa con la intención de asfixiar al equipo rival y evitar que este pueda crear ocasiones peligrosas. En ataque, el estilo será ofensivo y rápido, intentando pillar a la defensa descolocada tras haber recuperado el balón. En defensa, todos los jugadores participarán en la presión, por lo que estos deben de contar con buenas capacidades físicas para llegar a la defensa lo antes posible."
        }

        if(this.counterRec>maximo){ 
        maximo = this.counterRec
        this.textoRecomendatorio = "El estilo recomendado es contraataque."
        this.explicacionRecomendacionTactica = "En el estilo de contraataque, la principal peculiaridad es que intentaremos realizar ataques muy rápidos para intentar sorprender a la defensa e intentando aprovechar la velocidad de los atacantes de nuestro equipo. En ataque, la mentalidad será cautelosa, ya que no es necesario que todos los jugadores se sumen al ataque. En defensa, se puede o bien jugar a presioanr al rival y realizar contraataques rápidos o bien esperar en el área y aprovechar el hecho de que los defensas estarán muy adelantados para soprender."
        }

        if(this.wingPlayRec>maximo){ 
        maximo = this.wingPlayRec
        this.textoRecomendatorio = "El estilo recomendado es ataque por las bandas."
        this.explicacionRecomendacionTactica = "En el estilo por bandas, el equipo se especializará en acumular muchos jugadores en las bandas para obtener superioridades a lo largo del campo de juego. En ataque, la clave son los jugadores de banda, cuyo rol será tanto colocar centros como regatear para intentar marcar gol. En defensa, se aplicará una estrategia cautelosa inicialmente, aunque en algunas situaciones sí que se podrá presionar al equipo contrario."
        }

        if(this.catenaccionRec>maximo){ 
        maximo = this.catenaccionRec
        this.textoRecomendatorio = "El estilo recomendado es catenaccio."
        this.explicacionRecomendacionTactica = "En este estilo de juego, el principal objetivo es que a nuestro equipo no le lleguen a marcar ningún objetivo mediante el uso de una defensa férrea. En ataque, no se arriesgarán las posiciones de los jugadores defensivos, atacando con el menor número de jugadores posibles. En defensa, no se tomará ningún tipo de riesgo, depejando el balón siempre que sea necesario."
        }
    },
  },
};
</script>
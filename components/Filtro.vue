
<template>
  <div class="col fondo"> 
    <h1 class="subtitulo">Filter</h1>
    <div class="count">
      Results: {{ this.countValue }} 
    </div>
    <div class="filtro rosa">
      <h2 >Altura</h2>
      <span v-for="option in heightOptions" :key="option.id" >
        <label v-b-tooltip.hover.righttop :title="getToolTip(1,option.value)">
          <input type="checkbox" :value="option.value" v-model="filtrosAltura" v-on:change="cambiaFiltro">
          {{ option.label }}
        </label><br>
      </span>
    </div>
    <div class="filtro orange">
      <h2 >Peso</h2>
      <span v-for="option in weightOptions" :key="option.id" >
        <label v-b-tooltip.hover.righttop :title="getToolTip(2,option.value)">
          <input type="checkbox" :value="option.value" v-model="filtrosPeso" v-on:change="cambiaFiltro">
          {{ option.label }}
        </label><br>
      </span>
    </div>
    <div class="filtro blue">
      <h2 >Generación</h2>
      <span v-for="option in generacionOptions" :key="option.id" >
        <label>
          <input type="checkbox" :value="option.value" v-model="filtrosGeneracion" v-on:change="cambiaFiltro">
          {{ option.label }}
        </label><br>
      </span>
    </div>
    <div class="filtro green">
      <h2 >Tipo</h2>
      <span v-for="option in typeOptions" :key="option.id" >
        <label>
          <input type="checkbox" :value="option.value" v-model="filtrosTipo" v-on:change="cambiaFiltro">
          {{ option.label }}
        </label><br>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filtro',
  props: {
    countValue: Number
  },
  data() {
    return {
      filtrosGeneracion: [],
      filtrosTipo: [],
      filtrosAltura: [],
      filtrosPeso: [],
      cadenaFiltros: " ",
      copyCadenaFiltros: " ",
      arregloFiltros: [],
      generacionOptions: [
        { id: 1, value: 'generation-i', label: 'Generation l' },
        { id: 2, value: 'generation-ii', label: 'Generation ll' },
        { id: 3, value: 'generation-iii', label: 'Generation lll' },
        { id: 4, value: 'generation-iv', label: 'Generation IV' },
        { id: 5, value: 'generation-v', label: 'Generation V' },
        { id: 6, value: 'generation-vi', label: 'Generation VI' },
        { id: 7, value: 'generation-vii', label: 'Generation VII' },
        { id: 8, value: 'generation-viii', label: 'Generation VIII' },
        { id: 9, value: 'generation-ix', label: 'Generation IX' }
      ],
      typeOptions: [
        { id: 1, value: 'normal', label: 'Normal' },
        { id: 2, value: 'steel', label: 'Steel' },
        // { id: 3, value: 'shadow', label: 'Shadow' },
        { id: 4, value: 'fairy', label: 'Fairy' },
        { id: 6, value: 'bug', label: 'Bug' },
        { id: 7, value: 'dark', label: 'Dark' },
        { id: 8, value: 'dragon', label: 'Dragon' },
        { id: 9, value: 'electric', label: 'Electric' },
        { id: 10, value: 'fighting', label: 'Fighting' },
        { id: 11, value: 'fire', label: 'Fire' },
        { id: 12, value: 'flying', label: 'Flying' },
        { id: 13, value: 'ghost', label: 'Ghost' },
        { id: 14, value: 'grass', label: 'Grass' },
        { id: 15, value: 'ground', label: 'Ground' },
        { id: 16, value: 'ice', label: 'Ice' },
        { id: 17, value: 'poison', label: 'Poison' },
        { id: 18, value: 'psychic', label: 'Psychic' },
        { id: 19, value: 'rock', label: 'Rock' },
        { id: 20, value: 'water', label: 'Water' }
        // { id: 21, value: 'unknown', label: 'Unknown' }
      ],
      heightOptions: [
        { id: 1, value: 1, label: 'Pequeño' },
        { id: 2, value: 2, label: 'Mediano' },
        { id: 3, value: 3, label: 'Alto' },
        { id: 4, value: 4, label: 'Muy alto' }
      ],
      weightOptions: [
        { id: 1, value: 1, label: 'Ligero' },
        { id: 2, value: 2, label: 'Medio' },
        { id: 3, value: 3, label: 'Pesado' },
        { id: 4, value: 4, label: 'Muy pesado' }
      ]
    };
  },
  methods: {
    imprimeFiltros(){
      console.log("FILTROS");
      console.log("Generacion: "+this.filtrosGeneracion);
      console.log("Altura: "+this.filtrosAltura);
      console.log("Tipo: "+this.filtrosTipo);
      console.log("Peso: "+this.filtrosPeso);
    },
    cambiaFiltro(){
      this.arregloFiltros = [];
      this.imprimeFiltros();
      this.arregloFiltros.push(this.filtrosAltura,this.filtrosPeso,this.filtrosGeneracion,this.filtrosTipo);
      this.emiteFiltros();
    },
    emiteFiltros(){
			this.$emit('cambia-filtro', this.arregloFiltros);
    },
    getToolTip(filtro,value){
      let tool='';
      switch(filtro){
        case 1: //altura
          switch(value){
            case 1: //pequeño
              tool = "Menos de 1 metro";
              break;
            case 2: //mediano
              tool = "Entre 1 y 2 metros";
              break;
            case 3: //alto
              tool = "Entre 2 y 5 metros";
              break;
            case 4: //muy alto
              tool = "Más de 5 metros";
              break;
            default:
              tool = "Altura";
          }
          break;
        case 2: //peso
          switch(value){
            case 1: //ligero
              tool = "Menos de 10 kg";
              break;
            case 2: //medio
              tool = "Entre 10 y 100 kg";
              break;
            case 3: //pesado
              tool = "Entre 100 y 300 kg";
              break;
            case 4: //muy pesado
              tool = "Más de 300 kg";
              break;
            default:
              tool = "Peso";
          }
          break;
      }
      return tool;
    }
  }
}
</script>


<style>

.count {
  background-color: rgb(224, 224, 224);
  padding: 10px;
  margin: 20px;
  font-weight: bold;
}

.botonRosa {
  background : #FA8072 !important;
  border: solid 1px #fdb4bf !important;
  height: 40px;
}

.botonRosa:hover {
  background : #DC143C !important;
  border: solid 1px #fdb4bf !important;
  box-shadow: 1px 1px 2px #8B0000;
  /* transition: all 0.2s ease; */
}

.subtitulo {
  color: rgb(251, 149, 166);
  font-weight: bold;
  font-size: 25px;
  background: rgb(250, 250, 250);
}

.fondo {
  background: rgb(250, 250, 250);
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
}

#buscar {
  width: 300px;
  height: 40px;
  margin-right: 5px;
  border-radius: 8px;
  vertical-align: middle;
  padding: 10px;
  border: solid 2px gray;
}

.filtro {
  background: #FFC0CB;
  text-align: left;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.filtro h2 {
  font-size: 15px;
  font-weight: bold;
  margin: 3px;
}

.filtro input {
  font-size: 3px;
  vertical-align: middle; 
  margin: 5px;
}

.filtro label {
  font-size: 14px;
  vertical-align: middle; 
  display: inline;
}

.rosa {
  background-color: #FFB6C1;
}

.blue {
  background-color: #87CEFA;
}

.orange {
  background-color: #FFD700;
}

.green {
  background-color: #90EE90;
}

</style>
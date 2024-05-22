
<template>
	<div>
		<div class="rowsCont">
			<label for="sortSelect">Ordenar por:      </label>
      <b-form-select id="sortSelect" ref="sortSelect" v-model="sort" :options="optionsSort" ></b-form-select>
			<label for="rows-input">Número de registros:      </label>
			<b-form-input id="rows-input" v-model="perPage" type="number" value="20" min="1" max="30"></b-form-input>
		</div>
		<b-table id="listaPokemon" striped hover bordered light :fields="columnas" :items="copyDatos" :current-page="currentPage" @input="emiteNewCount" :per-page="perPage" :filter="searchString" @filtered="onFiltered" ref="table" label-sort-asc="" label-sort-desc="" label-sort-clear="">
			<template #cell(imagenPersonaje)="data">
				<b-img v-if="data.item.pokemon_v2_pokemonsprites_aggregate.nodes[0].sprites!=null" :src="`${data.item.pokemon_v2_pokemonsprites_aggregate.nodes[0].sprites}`" />
				<b-img v-else :src="'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='"/>
			</template>
			<template #cell(name)="data">
				{{ `${capitalizeFirstLetter(data.item.name)}` }}
			</template>
			<template #cell(generacionP)="data">
				{{ `${capitalizeFirstLetter(data.item.pokemon_v2_pokemonspecy.pokemon_v2_generation.name)}` }}
			</template>
			<template #cell(colorP)="data">
				{{ `${capitalizeFirstLetter(data.item.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name)}` }}
			</template>
			<template #cell(height)="data">
				{{ `${data.item.height/10}` }} m
			</template>
			<template #cell(weight)="data">
				{{ `${data.item.weight/10}` }} kg
			</template>
			<template #cell(pokemon_v2_pokemontypes_aggregate)="data">
				<ul v-for="(type, id) in data.item.pokemon_v2_pokemontypes_aggregate.nodes" :key="id">
					<li v-if="type.pokemon_v2_type.name==='normal'" class="tiposPokemon normal" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='steel'" class="tiposPokemon steel" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='fairy'" class="tiposPokemon fairy" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='bug'" class="tiposPokemon bug" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='dark'" class="tiposPokemon dark" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='dragon'" class="tiposPokemon dragon" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='electric'" class="tiposPokemon electric" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='fighting'" class="tiposPokemon fighting" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='fire'" class="tiposPokemon fire" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='flying'" class="tiposPokemon flying" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='grass'" class="tiposPokemon grass" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='ghost'" class="tiposPokemon ghost" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='ground'" class="tiposPokemon ground" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='ice'" class="tiposPokemon ice" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='poison'" class="tiposPokemon poison" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='psychic'" class="tiposPokemon psychic" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='rock'" class="tiposPokemon rock" > {{ type.pokemon_v2_type.name }} </li>
					<li v-if="type.pokemon_v2_type.name==='water'" class="tiposPokemon water" > {{ type.pokemon_v2_type.name }} </li>
				</ul>
			</template>
			<template #cell(boton)="data">
				<b-button class="botonRosa" @click="send(data.item.id)">Info</b-button>
			</template>
		</b-table>
		<div>
			<b-pagination v-model="currentPage" :current-page="currentPage" pills size="lg" align="center" :total-rows="rows" :per-page="perPage" aria-controls="listaPokemon"></b-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ListaPersonajes',
	props: {
		filterArr: [],
		searchString: String
	},
	data() {
		return {
			datos: [],
			copyDatos: [],
			rows: 20,
      currentPage: 1,
			perPage: 20,
      query: null,
      sort: 3,
			count: null,
			copyFiltro: " ",
			copyFilter: [],
			columnas: [
        {
          label: "ID",
          key: "id",
		  		sortable: true
        },
        {
          label: "Pokemon",
          key: "imagenPersonaje"
        },
        {
          label: "Nombre",
          key: "name",
		  		sortable: true
        },
        {
          label: "Generación",
          key: "generacionP"
        },
        {
          label: "Color",
          key: "colorP"
        },
        {
          label: "Altura",
          key: "height",
		  		sortable: true
        },
        {
          label: "Peso",
          key: "weight",
		  		sortable: true
        },
        {
          label: "Tipo",
          key: "pokemon_v2_pokemontypes_aggregate"
        },
        {
          label: "See more",
          key: "boton"
        },
      ],
      optionsSort: [
        { value: 1, text: 'A - Z' },
        { value: 2, text: 'Z - A' },
        { value: 3, text: 'ID ascendente' },
        { value: 4, text: 'ID descendente' }
      ]
		}
	},
	mounted() {
		this.checkPage();
		this.getData();
		localStorage.setItem('sortActive', this.sort);
	},
	computed: {
		getTableData(){
			this.scrollToTop();
			return () => this.getData();
		},
		actualiza(){
			this.scrollToTop();
			return () => this.getTableData();
		}
	},
	methods: {
		async getData() {
			if(this.query == null){
				this.ordenaDatos();
			}
			const response = await this.$axios.$post('https://beta.pokeapi.co/graphql/v1beta', { query: this.query, variables:{where:{
				"id": {
      	"_lt": 10
    	}
			}} });
			this.datos = response.data.pokemon_v2_pokemon;
			this.rows = this.datos.length;
			return response.data.pokemon_v2_pokemon
		},
		ordenaDatos() {
			var sortString;
      switch(this.sort){
        case 1: 
          sortString = '{name: asc}';
          break;
        case 2: 
          sortString = '{name: desc}';
          break;
        case 3: 
          sortString = '{id: asc}';
          break;
        case 4: 
          sortString = '{id: desc}';
          break;
        default:
          sortString = '{id: asc}';
      }
      this.query = `
        query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp) {
          pokemon_v2_pokemon(order_by: ${sortString}, where: $where) {
            height
            id
            name
            weight
            pokemon_v2_pokemontypes_aggregate {
              nodes {
                pokemon_v2_type {
                  name
                }
              }
            }
            pokemon_v2_pokemonsprites_aggregate {
              nodes {
                sprites(path: "other.official-artwork.front_default")
              }
            }
            pokemon_v2_pokemonspecy {
              pokemon_v2_pokemoncolor {
                name
                id
              }
              generation_id
              pokemon_v2_generation {
                name
                id
              }
            }
          }
          pokemon_v2_pokemon_aggregate(where: $where) {
            aggregate {
              count
            }
          }
        }
      `;
		},
		emiteNewCount() {
			this.$emit('cambia-count', this.rows);
		},
		scrollToTop() { 
      if (process.client) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
		},
		send(idValue) {
			this.$router.push({ path: 'about', query: { id: idValue } });
		},
		checkPage(){
      var pageLS = localStorage.getItem('currentPage');
			if(pageLS === null){
				pageLS = 1;
			}
      this.currentPage = pageLS;

			var sortLS = localStorage.getItem('sortActive');
			if(sortLS === null){
				sortLS = 3;
			}
      this.sort = sortLS;

      var perPageLS = localStorage.getItem('perPage');
			if(perPageLS === null){
				perPageLS = 20;
			}
      this.perPage = perPageLS;
		},
		onFiltered(filteredItems) { //al buscar una cadena
			this.rows = filteredItems.length
			this.currentPage = 1
			this.emiteNewCount();
		},
		actualizaTabla(){
			if((this.copyFilter.length===0 || this.copyFilter[0].length===0 && this.copyFilter[1].length===0 && this.copyFilter[2].length===0 && this.copyFilter[3].length===0)){
				this.copyDatos = this.datos;
			}
			else {
				var auxArr = []; //filtrado parcial
				var arregloFiltrado = []; //guarda todos los filtrados
				var arregloInterno = []; //depende de si son filtros anidados
				var filtradoAlturas = [];
				var filtradoPeso = [];
				var filtradoGeneracion = [];
				var filtradoTipos = [];
				if(this.copyFilter[0].length!=0){ //Altura
					this.copyFilter[0].forEach(element => {
						this.copyDatos = this.datos;
						switch(element){
							case 1: // Menos de 1 metro
								auxArr = this.copyDatos.filter(function(row) { 
									return row.height < 10
								});
								break;
							case 2: // Entre 1 y 2 metros
								auxArr = this.copyDatos.filter(function(row) { 
									return row.height >= 10 && row.height < 20
								});
								break;
							case 3: // Entre 2 y 5 metros
								auxArr = this.copyDatos.filter(function(row) { 
									return row.height >= 20 && row.height < 50
								});
								break;
							case 4: // Más de 5 metros
								auxArr = this.copyDatos.filter(function(row) { 
									return row.height >= 50
								});
								break;
							default:
								console.log("No sirve case de altura filtros");
						}
						arregloFiltrado = arregloFiltrado.concat(auxArr);
						filtradoAlturas = filtradoAlturas.concat(auxArr);
						this.copyDatos = arregloFiltrado;
					});
				}
				if(this.copyFilter[1].length!=0){ //Peso
					this.copyFilter[1].forEach(element => {
						if(filtradoAlturas.length !== 0){
							arregloInterno = filtradoAlturas.slice();
						}
						else{
							console.log("copiD");
							console.log(this.copyDatos);
							arregloInterno = this.datos;
						}
						console.log(element);
						console.log("Arr Interno");
						console.log(arregloInterno);
						switch(element){
							case 1: // Menos de 10 kg
								auxArr = arregloInterno.filter(function(row) { 
									return row.weight < 100
								});
								break;
							case 2: // Entre 10 y 100 kg
								auxArr = arregloInterno.filter(function(row) { 
									return row.weight >= 100 && row.weight < 1000
								});
								break;
							case 3: // Entre 100 y 300 kg
								auxArr = arregloInterno.filter(function(row) { 
									return row.weight >= 1000 && row.weight < 3000
								});
								break;
							case 4: // Más de 300 kg
								auxArr = arregloInterno.filter(function(row) { 
									return row.weight >= 3000
								});
								break;
							default:
								console.log("No sirve case de altura filtros");
						}
						console.log("Arr aux");
						console.log(auxArr);
						filtradoPeso = filtradoPeso.concat(auxArr);
					});
					arregloFiltrado.length = 0;
					arregloFiltrado.push(...filtradoPeso);
					this.copyDatos = arregloFiltrado;
					this.rows = this.copyDatos.length;
				}
				if(this.copyFilter[2].length!=0){ //Generacion
					this.copyFilter[2].forEach(element => {
						if(filtradoPeso.length !== 0){
							arregloInterno = filtradoPeso.slice();
						}
						else{
							arregloInterno = this.datos;
						}
						
						auxArr = arregloInterno.filter(fila => this.copyFilter[2].some(gen => gen === fila.pokemon_v2_pokemonspecy.pokemon_v2_generation.name));

						filtradoGeneracion = filtradoGeneracion.concat(auxArr);
					});
					arregloFiltrado.length = 0;
					arregloFiltrado.push(...filtradoGeneracion);
					this.copyDatos = arregloFiltrado;
					this.rows = this.copyDatos.length;
				}
				if(this.copyFilter[3].length!=0){ //Tipos
					this.copyFilter[3].forEach(element => {
						if(filtradoGeneracion.length !== 0){
							arregloInterno = filtradoGeneracion.slice();
						}
						else{
							arregloInterno = this.datos;
						}
						auxArr = arregloInterno.filter(fila => 
							this.copyFilter[3].some(type => 
								fila.pokemon_v2_pokemontypes_aggregate.nodes.some(node => 
									type === node.pokemon_v2_type.name
								)
							)
						);
						filtradoTipos = filtradoTipos.concat(auxArr);
					});
					arregloFiltrado.length = 0;
					arregloFiltrado.push(...filtradoTipos);
					this.copyDatos = arregloFiltrado;
					this.rows = this.copyDatos.length;
				}
			}
			this.rows = this.copyDatos.length;
			this.emiteNewCount();
			this.$refs.table.refresh();
		},
		capitalizeFirstLetter(string) {
			if (!string) return '';
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	},
	watch: {
		filterArr: function() {
			this.copyFilter = this.filterArr.slice();
			this.actualizaTabla();
		}
    ,
		copyFilter: function() {
      localStorage.setItem('filterArr', this.filterArr);
			this.actualizaTabla();
		},
    currentPage: function() {
      localStorage.setItem('currentPage', this.currentPage);
    },
    perPage: function(){
      localStorage.setItem('perPage', this.perPage);
    },
    sort: function () {
      this.ordenaDatos();
      this.getTableData();
			localStorage.setItem('sortActive', this.sort);
    },
		datos: function() {
			this.copyDatos = this.datos;
		}
  }
}
</script>

<style>
img {
  width: 120px; 
  height: auto; 
}

ul {
  list-style-type: none;
	display: flex;
	justify-content: center;
	vertical-align: middle;
	padding: 0%;
}

.normal {
	background-color: #e8c190d1;
}
.steel {
	background-color: #a1c5f5;
}
.fairy {
	background-color: #FFB6C1;
}
.bug {
	background-color: #b4eb47af;
}
.dark {
	background-color: #2f4f4f78;
}
.dragon {
	background-color: #4c008264;
}
.electric {
	background-color: #FFD700;
}
.fighting {
	background-color: #8b00008e;
}
.fire {
	background-color: #ff4400c2;
}
.flying {
	background-color: #ADD8E6;
}
.ghost {
	background-color: #d9d9de;
}
.grass {
	background-color: #4bee4bd6;
}
.ground {
	background-color: #8b451391;
}
.ice {
	background-color: #b6c9ff;
}
.poison {
	background-color: #9932cc6e;
}
.psychic {
	background-color: #80008074;
}
.rock {
	background-color: #a52a2aa9;
}
.water {
	background-color: #5f7fdede;
}

.tiposPokemon{
	padding: 7px;
	padding-bottom: 10px;
	align-content: center;
	justify-content: center;
	vertical-align: middle;
	width: 70%;
	border-radius: 15px;
	color: rgb(255, 255, 255);
	border: solid 3px white;
  box-shadow: 5px 2px 5px rgba(0, 0, 0, 0.5);
	font-size: 15px;
}

.b-table tr {
  text-align: center; /* Centrado horizontal */
  vertical-align: middle; /* Centrado vertical */
}

.titulo {
  color: rgb(251, 149, 166);
  font-weight: bold;
  padding: 10px;
  margin: 20px;
  background: rgb(250, 250, 250);
}

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
  background : #FA8072 !important;
  border: solid 1px #fdb4bf !important;
}

.b-pagination button { /* estilos para todos los botones */
  background-color: #f8f9fa; /* Color de fondo de los botones */
  border-color: #fdb4bf; /* Color del borde del botón activo */
  color: #e57d90; /* Color del texto de los botones */
}

.b-pagination button:hover {
  color: #ffffff; 
  border-color: #fdb4bf; 
  background-color: #fdb4bf; /* Cambiar color de fondo en hover */
  font-weight: bold;
}

.page-item.active .page-link { /* el boton de la página actual */
    color: #fff;
    background-color: #FA8072;
    border-color: #e57d90;
    font-weight: bold;
}

.page-link.active, .active > .page-link {
    border-color: #ed3591;
    background-color: #ed3591; /* Color de fondo del botón activo */
    color: white;
}

.rowsCont {
	background-color: #87CEFA;
	padding: 15px;
	display: flex;
  justify-content: right; 
	align-items: center;
}

.rowsCont input {
	width: 150px;
	vertical-align: middle;
	margin-left: 20px;
}

.rowsCont select {
	width: 150px;
  height: 38px;
	vertical-align: middle;
	margin-left: 20px;
  margin-right: 20px;
  border-radius: 8px;
  border: none;
  padding: 7px;
  font-size: 15px;
}

.rowsCont label {
	vertical-align: middle;
	color: whitesmoke;
	font-weight: bold;
	font-size: 20px;
}

</style>
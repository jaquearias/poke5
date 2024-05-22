
<template>
  <div class="hello">
    <Header/>
    <div class="fondoPrincipalAbout">
      <h1 class="title">Detalles de personaje</h1>
    </div>
    <div>
      <b-table stacked class="tabla" ref="table" :fields="columnas" :items="datos">
        <template #cell(imagenPersonaje)="data">
          <b-img v-if="data.item.pokemon_v2_pokemonsprites_aggregate.nodes[0].sprites!=null" :src="`${data.item.pokemon_v2_pokemonsprites_aggregate.nodes[0].sprites}`" />
          <b-img v-else :src="'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='"/>
        </template>
        <template #cell(name)="data">
          {{ `${capitalizeFirstLetter(data.item.name)}` }} 
        </template>
        <template #cell(generation)="data">
          {{ `${capitalizeFirstLetter(data.item.pokemon_v2_pokemonspecy.pokemon_v2_generation.name)}` }} 
        </template>
        <template #cell(color)="data">
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
            <li v-if="type.pokemon_v2_type.name==='normal'" class="tiposPokemonD normal" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='steel'" class="tiposPokemonD steel" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='fairy'" class="tiposPokemonD fairy" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='bug'" class="tiposPokemonD bug" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='dark'" class="tiposPokemonD dark" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='dragon'" class="tiposPokemonD dragon" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='electric'" class="tiposPokemonD electric" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='fighting'" class="tiposPokemonD fighting" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='fire'" class="tiposPokemonD fire" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='flying'" class="tiposPokemonD flying" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='grass'" class="tiposPokemonD grass" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='ghost'" class="tiposPokemonD ghost" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='ground'" class="tiposPokemonD ground" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='ice'" class="tiposPokemonD ice" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='poison'" class="tiposPokemonD poison" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='psychic'" class="tiposPokemonD psychic" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='rock'" class="tiposPokemonD rock" > {{ type.pokemon_v2_type.name }} </li>
            <li v-if="type.pokemon_v2_type.name==='water'" class="tiposPokemonD water" > {{ type.pokemon_v2_type.name }} </li>
          </ul>
        </template>
        <template #cell(pokemon_v2_pokemonabilities)="data">
          <ul v-for="(hab, id) in data.item.pokemon_v2_pokemonabilities" :key="id">
            <li class="habilidadesPokemon" > {{hab.pokemon_v2_ability.name}} </li>
          </ul>
        </template>
        <template #cell(hp)="data">
          <div class="centrarBarra">
            {{ `${data.item.pokemon_v2_pokemonstats[0].base_stat}` }} <span class="etiqueta"> /255</span>
            <b-form-input id="range_hp" type="range" min="1" max="255" :value=data.item.pokemon_v2_pokemonstats[0].base_stat></b-form-input>
          </div>
        </template>
        <template #cell(attack)="data">
          <div class="centrarBarra">
            {{ `${data.item.pokemon_v2_pokemonstats[1].base_stat}` }} <span class="etiqueta"> /190</span>
            <b-form-input id="range_hp" type="range" max="190" :value=data.item.pokemon_v2_pokemonstats[1].base_stat></b-form-input>
          </div>
        </template>
        <template #cell(defense)="data">
          <div class="centrarBarra">
            {{ `${data.item.pokemon_v2_pokemonstats[2].base_stat}` }} <span class="etiqueta"> /230</span>
            <b-form-input id="range_hp" type="range" max="230" :value=data.item.pokemon_v2_pokemonstats[2].base_stat></b-form-input>
          </div>
        </template>
        <template #cell(special-attack)="data">
          <div class="centrarBarra">
            {{ `${data.item.pokemon_v2_pokemonstats[3].base_stat}` }} <span class="etiqueta"> /194</span>
            <b-form-input id="range_hp" type="range" max="194" :value=data.item.pokemon_v2_pokemonstats[3].base_stat></b-form-input>
          </div>
        </template>
        <template #cell(special-defense)="data">
          <div class="centrarBarra">
            {{ `${data.item.pokemon_v2_pokemonstats[4].base_stat}` }} <span class="etiqueta"> /230</span>
            <b-form-input id="range_hp" type="range" max="230" :value=data.item.pokemon_v2_pokemonstats[4].base_stat></b-form-input>
          </div>
        </template>
        <template #cell(speed)="data">
          <div class="centrarBarra">
            {{ `${data.item.pokemon_v2_pokemonstats[5].base_stat}` }} <span class="etiqueta"> /180</span>
            <b-form-input id="range_hp" type="range" max="180" :value=data.item.pokemon_v2_pokemonstats[5].base_stat></b-form-input>
          </div>
        </template>
        <template #cell(evolution)="data">
          <ul class="pokemonEvolucion" v-for="(type, id) in data.item.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies" :key="id">
            <li @click="send(type.id)"> 
              {{capitalizeFirstLetter(type.name)}} 
              <b-img :src="`${type.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites_aggregate.nodes[0].sprites}`" />
            </li>
          </ul>
        </template>
      </b-table>
        <div class="contieneBoton">
            <BButton size="lg" class="botonRosa2" @click="regresar()" >Characters List</BButton>
        </div>
    </div>
  </div>
</template>

<script>
// import Header from '~/components/Header.vue'

export default {
    // components: {
    //   Header
    // },
    data() {
      return {
        id: 1,
        datos: null,
        pokemonId: null,
        columnas: [
          {
            label: "Pokemon",
            key: "id"
          },
          {
            label: "Nombre",
            key: "name"
          },
          {
            label: "Imagen",
            key: "imagenPersonaje"
          },
          {
            label: "Generación",
            key: "generation"
          },
          {
            label: "Color",
            key: "color"
          },
          {
            label: "Altura",
            key: "height"
          },
          {
            label: "Peso",
            key: "weight"
          },
          {
            label: "Tipo",
            key: "pokemon_v2_pokemontypes_aggregate"
          },
          {
            label: "Habilidades",
            key: "pokemon_v2_pokemonabilities"
          },
          {
            label: "Estadísticas"
          },
          {
            label: "HP (Hit Points - Puntos de Salud):",
            key: "hp"
          },
          {
            label: "Ataque:",
            key: "attack"
          },
          {
            label: "Defensa:",
            key: "defense"
          },
          {
            label: "Ataque Especial:",
            key: "special-attack"
          },
          {
            label: "Defensa Especial:",
            key: "special-defense"
          },
          {
            label: "Velocidad:",
            key: "speed"
          },
          {
            label: "Cadena de evolución",
            key: "evolution"
          }
        ]
      };
    },
    head() {
      return {
        title: 'Detalles'
      }
    },
    mounted() {
      this.pokemonId = this.$route.query.id;
      this.getInfo();
    },
    methods: {
      async getInfo() {
        var queryVar = `
          query Pokemon_v2_pokemon {
            pokemon_v2_pokemon(where: {id: {_eq: ${this.pokemonId} }}) {
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
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
              pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                  name
                }
              }
              pokemon_v2_pokemonsprites_aggregate {
                nodes {
                  sprites(path: "other.official-artwork.front_default")
                }
              }
              pokemon_v2_pokemonspecy {
                pokemon_v2_evolutionchain {
                  pokemon_v2_pokemonspecies {
                    name
                    id
                    pokemon_v2_pokemons {
                      pokemon_v2_pokemonsprites_aggregate {
                        nodes {
                          sprites(path: "other.official-artwork.front_default")
                        }
                      }
                    }
                  }
                }
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
            pokemon_v2_pokemon_aggregate {
              aggregate {
                count
              }
            }
          }
        `;
        const response = await this.$axios.$post('https://beta.pokeapi.co/graphql/v1beta', { query: queryVar });
        this.datos = response.data.pokemon_v2_pokemon;
      },
      regresar() {
        this.$router.push({ name: 'index'});
		  },
      send(idValue) {
        this.$router.push({ path: 'about', query: { id: idValue } });
        this.pokemonId = idValue;
        this.getInfo();
        this.$refs.table.refresh();
			  this.scrollToTop();
      },
      scrollToTop() {
        if (process.client) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      },
      capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
}
</script>

<style>

li {
  display: inline-block;
  margin: 0 10px;
}

.hello img {
  width: 400px; 
  height: auto; 
  border-radius: 10px;
}


.title {
  /* background-color: #FA8072; */
  /* margin-bottom: 10px; */
  color: white;
  padding-top: 20px;
}

.b-table { 
  text-align: center; 
  vertical-align: middle; 
}

.titulo {
  color: rgb(251, 149, 166);
  font-weight: bold;
  padding: 10px;
  margin: 20px;
  background: rgb(250, 250, 250);
}

.botonRosa2 {
  background : #FA8072 !important;
  border: solid rgb(255, 255, 255) !important;
}

.botonRosa2:hover {
  background : #f15c4c !important;
  border: solid 1px #fdb4bf !important;
}

.contieneBoton {
  display: flex;
  justify-content: center; 
  margin-bottom: 50px;
}

.fondoPrincipalAbout {
  background-color: #FA8072;
  margin-bottom: 15px;
  margin-top: 10px;
  text-align: center;
  padding-bottom: 20px;
}

.centrarBarra {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin: 10px;
}

.centrarBarra input {
  margin-left: 20px;
  margin-right: 20px;
  width: 60%;
}

.pokemonEvolucion li {
  background-color: #98FB98;
	border-radius: 200px; 
  width: 40%;
  font-weight: bold;
  border: solid 6px #73e773;
}

.pokemonEvolucion li:hover {
  background-color: #73e773;
  cursor: pointer;
  border: solid 6px #98FB98;
}

.pokemonEvolucion img{
  width: 200px;
  height: auto;
  /* margin-left: 20px; */
}

.habilidadesPokemon{
  background-color: #FA8072;
  padding: 7px;
	padding-bottom: 10px;
	align-content: center;
	justify-content: center;
	vertical-align: middle;
	width: 70%;
	border-radius: 15px;
	color: rgb(255, 255, 255);
	border: solid 3px rgb(255, 255, 255);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
	font-size: 18px;
}

.tabla {
	font-size: 18px;
}

.tiposPokemonD{
	/* background-color: pink; */
	padding: 7px;
	padding-bottom: 10px;
	align-content: center;
	justify-content: center;
	vertical-align: middle;
	width: 70%;
	border-radius: 15px;
	color: rgb(255, 255, 255);
	border: solid 3px white;
	/* font-weight: bold; */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
	font-size: 18px;
}
.etiqueta{
  color: gray;
  font-weight: lighter;
}

</style>
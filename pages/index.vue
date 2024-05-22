
<template>
  <div>
    <Header/>
    <div class="fondoPrincipal">
      <h1 class="title">Lista de personajes</h1>
      <b-form-group class="fondoSearch">
        <b-input-group size="sm">
          <b-form-input id="filter-input" v-model="search" type="search" placeholder="Search..."></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!search" @click="search = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <b-row>
      <b-col sm="2" class="filtrosSection">
        <Filtro :countValue="count" @cambia-filtro="changeFilter"/>
      </b-col>
      <b-col sm="10" class="tablaSection">
        <ListaPersonajes :filterArr="filter" :searchString="search" @cambia-count="changeCount" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Header from '~/components/Header.vue'
// import Filtro from '~/components/Filtro.vue'
// import ListaPersonajes from '~/components/ListaPersonajes.vue'

export default {
  name: 'IndexPage',
  // components: {
  //   Header,
  //   Filtro,
  //   ListaPersonajes
  // },
  data(){
    return {
      count: null,
      filter: [],
      search: ""
    }
  },
  head() {
    return {
      title: 'Pokemón'
    }
  },
  methods: {
    changeCount(newCount){
      this.count = newCount;
    },
    changeFilter(newFilter){
      this.filter = newFilter;
      console.log("Los filtros recibidos: "+this.filter);
    }
  }
}
</script>

<style>
.fondoPrincipal {
  background-color: #FA8072;
  margin-bottom: 15px;
  margin-top: 10px;
  text-align: center;
}
.title {
  color: white;
  padding-top: 20px;
}

.fondoSearch {
  padding: 20px;
  display: flex;
  justify-content: center; 
  align-items: center;
}
</style>
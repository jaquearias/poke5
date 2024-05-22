{
   "where":{
    "id": {
      "_lt": 10
    },
    "weight": {
      "_lt": 100
    }
  },
  "offset": 2
}







----

query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp, $order_by: [pokemon_v2_pokemon_order_by!], $limit: Int = 2, $offset: Int = 0) {
  pokemon_v2_pokemon(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
    height
    id
    name
    weight
    pokemon_v2_pokemonspecy {
      is_baby
    }
  }
  pokemon_v2_pokemon_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}



{
  "where":{
   "_and": [
     {
       "_or": [
         {
           "id": {
             "_eq": 10
           }
         },
         {
           "id": {
             "_eq": 11
           }
         }
       ]
     },
     {
       "_or": [
        {
         "weight": {
             "_lt": 50
           }
       },
         {
         "weight": {
             "_eq": 99
           }
         }
       ]  
     }
   ]
 },
 "offset": 0
}
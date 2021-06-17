import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, ImageBackground } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import Detalles from './components/Detalles';


const image = { uri: "https://i2.wp.com/nintendosoup.com/wp-content/uploads/2019/11/pokemon-secret-club-wallpaper-nov142019.jpg?resize=1038%2C576&ssl=1" };


export default function App() {
  const [datos, setDatos] = useState({
    loading: false,
    pokemon: [],
    url: 'https://pokeapi.co/api/v2/pokemon/',
    urlOld: ''
  });
  const [datosPokemon, setDatosPokemon] = useState({
    name:'',
    abilities:[],
    base_experience:0,
    forms: [],
    img:'',
    height:0,
    weight:0


  });
  const [pokemonEspecifico, setPokemonEspecifico] = useState({ disponible: false, url: '' });

  const getDetalles = (url) => {
    fetch(url).
      then(res => res.json())
      .then(res => {
        setDatosPokemon({
          name:res.name,
          abilities: res.abilities,
          base_experience: res.base_experience,
          forms: res.forms,
          img:res.sprites.other.dream_world.front_default,
          height: res.height,
          weight: res.weight
        })
      })
    setPokemonEspecifico({ disponible: true });
    console.log(datosPokemon.data)
  }

  const getPokemon = (valor) => {
    if (valor === "next") {
      setDatos({ loading: true });
      fetch(datos.url).
        then(res => res.json())
        .then(res => {
          console.log(res);
          setDatos({
            pokemon: res.results,
            url: res.next,
            loading: false,
            urlOld: res.previous
          })
        });
    } else if (valor === "previous") {
      setDatos({ loading: true });
      fetch(datos.urlOld).
        then(res => res.json())
        .then(res => {
          console.log(res);
          setDatos({
            pokemon: res.results,
            url: res.next,
            loading: false,
            urlOld: res.previous
          })
        });
    } else {
      setDatos({ loading: true });
      fetch(datos.url).
        then(res => res.json())
        .then(res => {
          console.log(res);
          setDatos({
            pokemon: res.results,
            url: res.next,
            loading: false,
            urlOld: res.previous
          })
        });
    }

  };
  useEffect(() => {
    getPokemon();
    console.log("Entro al effect")
  }, [pokemonEspecifico]);


  if (datos.loading) {
    return (
      <View style={styles.container}>
        
        <Text>Descargando pokemon</Text>
      </View>
    );
  }
  
  if (pokemonEspecifico.disponible === false) {
    return (
      <View style={{ flex: 1, paddingTop: 50, paddingBottom: 50, alignContent: 'center', alignItems: 'center' }}>
         
        <FlatList style={{height:400 }}
          data={datos.pokemon}
          renderItem={
            ({ item }) =>
              <View key={item.id}>
                <Card style={{ flex: 1 }} key={item.id}>
                  <Card.Title>{item.name}</Card.Title>
                  <Button onPress={(() => { getDetalles(item.url) })} color="red" title="Ver detalles"></Button>
                </Card>
              </View>

          }
        />
        <View style={{paddingBottom:5}}>
          <Button
            title="Previous"
            onPress={() => getPokemon("previous")}
          />
        </View>
<View>
<Button
          title="Next"
          onPress={() => getPokemon("next")}
        />
</View>
      </View>
    );
  } else {
    return (
      <ImageBackground source={image} style={{justifyContent: "center"}}>
      <Detalles
      
        datosPokemon={datosPokemon}
        setPokemonEspecifico={setPokemonEspecifico}
        setDatos={setDatos}
        datos={datos}
      />
      </ImageBackground>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

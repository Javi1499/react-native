import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';


const Detalles = ({ datosPokemon, setPokemonEspecifico, setDatos, datos }) => {
    console.log(datosPokemon.forms)
    return (
        <View style={{height:"100%", alignContent: 'center', justifyContent:"center" }}>
<Card >
            <Card.Title style={{ textTransform: 'uppercase', fontSize: 20 }}>{datosPokemon.name}</Card.Title>
            <Card.Divider />
            <View >
                <View style={{ float: 'left' }}>
                    <Text style={{ fontWeight: 'bold' }}>Formas del pokemon</Text>
                    {datosPokemon.forms.map(form => (
                        <Text key={0} style={{ textTransform: 'capitalize' }}>{form.name}</Text>
                    ))}

                    <Text style={{ fontWeight: 'bold' }}>Habilidades</Text>
                    {datosPokemon.abilities.map(abilitie => (
                        <Text style={{ textTransform: 'capitalize' }}>{abilitie.ability.name}</Text>
                    ))}

                    <Text style={{ fontWeight: 'bold' }}>Altura y anchura</Text>
                    <Text>{"Altura: " + datosPokemon.height}</Text>
                    <Text>{"Anchura: " + datosPokemon.weight}</Text>
                </View>
                <View style={{ float: 'right' }}>

                    <Image style={{ width: 200, height: 200 }} source={{ uri: datosPokemon.img }} resizeMode={'stretch'} />
                </View>
            </View>


            <Button title="Regresar" onPress={() => {
                setDatos({ url: datos.urlOld });
                setPokemonEspecifico({ disponible: false });
            }} />
        </Card>
        </View>
        
    );
}

export default Detalles;
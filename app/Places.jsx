import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import {Colors} from '../constants/Colors';

const Places = () => {
  const optionCards = [
    {id: '1', name: 'Cricket', state: 'OPEN', source: require('../assets/images/optionTypes/sports/cricket.png')},
    {id: '2', name: 'Football', state: 'CLOSE', source: require('../assets/images/optionTypes/sports/football.png')},
    {id: '3', name: 'Badminton', state: 'OPEN', source: require('../assets/images/optionTypes/sports/badminton.png')},
    {id: '4', name: 'Basketball', state: 'CLOSE', source: require('../assets/images/optionTypes/sports/basketball.png')},
    {id: '5', name: 'Carrom', state: 'OPEN', source: require('../assets/images/optionTypes/sports/carrom.png')},
    {id: '6', name: 'Chess', state: 'OPEN', source: require('../assets/images/optionTypes/sports/chess.png')},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Places to Visit</Text>
      </View>

      <View style={{flex: 1}}>
        <FlatList data={optionCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={item.source} style={styles.image}/>
            </View>
            <View style={styles.cardTitle}>
              <Text style={styles.cardTitleTxt}>{item.name}</Text>
              <Text style={[styles.cardState, {color: item.state == 'OPEN' ? 'green' : 'red'}]}>{item.state}</Text>
            </View>
          </TouchableOpacity>
        )}/>
      </View>
    </View>
  )
}

export default Places

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  subHeading: {
    // backgroundColor: 'green',
    padding: 20
  },
  subHeadingTxt: {
    fontSize: 20,
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 25,
    paddingRight: 15,
    // backgroundColor: 'green',
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: 'row'
  },
  cardState: {
    fontWeight:"bold"
  },
  cardTitleTxt: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 100,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%'
  },
})
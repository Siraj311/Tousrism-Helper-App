import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import {Colors} from '../constants/Colors';
import { useRouter } from 'expo-router';

const OptionTypes = () => {
  const router = useRouter();
  
  const optionCards = [
    {id: '1', name: 'Cricket', source: require('../assets/images/optionTypes/sports/cricket.png')},
    {id: '2', name: 'Football', source: require('../assets/images/optionTypes/sports/football.png')},
    {id: '3', name: 'Badminton', source: require('../assets/images/optionTypes/sports/badminton.png')},
    {id: '4', name: 'Basketball', source: require('../assets/images/optionTypes/sports/basketball.png')},
    {id: '5', name: 'Carrom', source: require('../assets/images/optionTypes/sports/carrom.png')},
    {id: '6', name: 'Chess', source: require('../assets/images/optionTypes/sports/chess.png')},
  ];

  const handlePress = (name) => {
    router.push('/Places');
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Options Types</Text>
      </View>
      
      <View style={{flex: 1}}>
        <FlatList data={optionCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item.name)}>
            <View style={styles.imageContainer}>
              <Image source={item.source} style={styles.image}/>
            </View>
            <View style={styles.cardTitle}>
              <Text style={styles.cardTitleTxt}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}/>
      </View>
    </View>
  )
}

export default OptionTypes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EAEDF1'
    backgroundColor: '#fff'
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
    backgroundColor: '#0172B2',
    borderRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  cardTitleTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 25
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
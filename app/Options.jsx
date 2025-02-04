import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import {Colors} from '../constants/Colors';
import { useRouter } from 'expo-router';

const Options = () => {
  const router = useRouter();

  const optionCards = [
    {id: '1', name: 'Sports', source: require('../assets/images/options/sports.png')},
    {id: '2', name: 'Movie Watching', source: require('../assets/images/options/movie.png')},
    {id: '3', name: 'Music', source: require('../assets/images/options/music.png')},
    {id: '4', name: 'Realxing', source: require('../assets/images/options/relax.png')},
    {id: '5', name: 'Gaming', source: require('../assets/images/options/gaming.png')},
    {id: '6', name: 'Other', source: require('../assets/images/options/other.png')},
  ];

  const handlePress = (name) => {
    router.push('/OptionTypes')
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Options to proceed</Text>
      </View>
      
      <View style={{flex: 1}}>
        <FlatList data={optionCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.optionCard} onPress={() => handlePress(item.name)}>
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

export default Options

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
  optionCard: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5
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
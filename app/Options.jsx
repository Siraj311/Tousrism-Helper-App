import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const Options = () => {
  const optionCards = [
    {id: '1', name: 'Sports', img: require('../assets/images/options/sports.png')},
    {id: '2', name: 'Music', img: require('../assets/images/options/movie.jpg')},
    {id: '3', name: 'Movie Watching', img: require('../assets/images/options/music.jpg')},
    {id: '4', name: 'Realxing', img: require('../assets/images/options/relax.png')},
    {id: '5', name: 'Gaming', img: require('../assets/images/options/gaming.png')},
    {id: '6', name: 'Other', img: require('../assets/images/options/other.png')},
  ];

  return (
    <View style={styles.container}>
      <FlatList data={optionCards}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(item) => (
        <TouchableOpacity style={styles.optionCard}>
          <View style={styles.imageContainer}>
            <Image source={item.img} style={styles.image}/>
          </View>
          <View>

          </View>
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default Options

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  optionCard: {
    flexDirection: 'row',
    height: 100,
    backgroundColor:'green',
    marginHorizontal: 20,
    marginVertical: 10
  },
  imageContainer: {
    width: 100,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
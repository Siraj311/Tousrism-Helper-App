import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import {Colors} from '../constants/Colors';

const index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTxt}>Weather Selector</Text>
      </View>

      <View style={styles.weatherContainer}>
        <TouchableOpacity style={styles.weatherCard} onPress={() => router.push({pathname: './Options'})}>
          <View style={styles.imageConatiner}>
            <Image source={require('../assets/images/weatherDay/SunnyDay.jpg')} style={styles.weatherImage}/>
          </View>
          <View style={styles.weatherTitle}>
            <Text style={styles.cardTxt}>Sunny Day</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.weatherCard}>
          <View style={styles.imageConatiner}>
            <Image source={require('../assets/images/weatherDay/RainyDay.jpg')} style={styles.weatherImage}/>
          </View>
          <View style={styles.weatherTitle}>
            <Text style={styles.cardTxt}>Rainy Day</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.weatherCard}>
          <View style={styles.imageConatiner}>
            <Image source={require('../assets/images/weatherDay/RainyDay.jpg')} style={styles.weatherImage}/>
          </View>
          <View style={styles.weatherTitle}>
            <Text style={styles.cardTxt}>Hazard Day</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 50,
    paddingVertical: 10
  },
  headerTxt: {
    fontSize: 25,
    fontWeight: '600'
  },
  subHeader: {
    paddingVertical: 10
  },
  subHeaderTxt: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center'
    // justifyContent: 'center',
  },
  weatherCard: {
    width: '100%',
    borderRadius: 10,
    margin: 20,
    marginTop: 30
  },
  imageConatiner: {
    height: 150, 
    width: '100%',
  },
  weatherImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10
  },
  cardTxt: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 5
  }
})
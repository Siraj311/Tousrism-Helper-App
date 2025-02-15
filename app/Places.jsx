import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from '../constants/Colors';
import { db } from "../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";
import { useLocalSearchParams } from 'expo-router';

const Places = () => {
  const { dayTypeId, categoryId, subCategoryId } = useLocalSearchParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (!dayTypeId || !categoryId || !subCategoryId) return;
  
        // ✅ First, get the parent document reference
        const subCategoryDocRef = doc(db, "dayTypes", dayTypeId, "categories", categoryId, "SubCategories", subCategoryId);
  
        // ✅ Then, get the subcollection reference
        const placesRef = collection(subCategoryDocRef, "places");
  
        // ✅ Fetch data from the subcollection
        const querySnapshot = await getDocs(placesRef);
        const placesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setPlaces(placesList);
        console.log("Places:", placesList);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
  
    fetchPlaces();
  }, [dayTypeId, categoryId, subCategoryId]);

  const optionCards = [
    {id: '1', name: 'Cricket Club', state: 'OPEN', source: require('../assets/images/places/cricketPlace.jpg')},
    {id: '2', name: 'Magic Indoor', state: 'CLOSE', source: require('../assets/images/places/cricketPlace.jpg')},
    {id: '3', name: 'Outdoor', state: 'OPEN', source: require('../assets/images/places/cricketPlace.jpg')},
    {id: '4', name: 'Best Play', state: 'CLOSE', source: require('../assets/images/places/cricketPlace.jpg')},
    {id: '5', name: 'SL Club', state: 'OPEN', source: require('../assets/images/places/cricketPlace.jpg')},
    {id: '6', name: 'Sport Club', state: 'OPEN', source: require('../assets/images/places/cricketPlace.jpg')},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Places to Visit</Text>
      </View>

      <View style={{flex: 1}}>
        <FlatList data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{uri: `${item.imageURL}`}} style={styles.image}/>
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
    height: '100%',
    borderRadius: 10
  },
})
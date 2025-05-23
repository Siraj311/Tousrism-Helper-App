import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from '../constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from "../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

const Options = () => {
  const router = useRouter();
  const { dayTypeId } = useLocalSearchParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)

        const categoriesRef = collection(doc(db, "dayTypes", dayTypeId), "categories");
        const querySnapshot = await getDocs(categoriesRef);
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
        console.log("Categories:", categoriesList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (dayTypeId) fetchCategories();
  }, [dayTypeId]);

  const handlePress = (catergoryId) => {
    router.push({pathname: './Places', params: {dayTypeId: dayTypeId, categoryId: catergoryId}})
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Options to proceed</Text>
      </View>
      
      <View style={{flex: 1}}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <FlatList data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.optionCard} onPress={() => handlePress(item.id)}>
              <View style={styles.imageContainer}>
                <Image source={{uri: `${item.imageURL}`}} style={styles.image}/>
              </View>
              <View style={styles.cardTitle}>
                <Text style={styles.cardTitleTxt}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}/>
        )}
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
    height: '100%',
    borderRadius: 10
  },
})
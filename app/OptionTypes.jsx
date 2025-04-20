import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from '../constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from "../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

const OptionTypes = () => {
  const router = useRouter();
  const { dayTypeId, categoryId } = useLocalSearchParams();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (!dayTypeId || !categoryId) return;
  
        // ✅ First, get the parent document reference
        const categoryDocRef = doc(db, "dayTypes", dayTypeId, "categories", categoryId);
  
        // ✅ Then, get the subcollection reference
        const subCategoriesRef = collection(categoryDocRef, "subCategories");
  
        // ✅ Fetch data from the subcollection
        const querySnapshot = await getDocs(subCategoriesRef);
        const subCategoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setSubCategories(subCategoriesList);
        console.log("SubCategories:", subCategoriesList);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
  
    fetchSubCategories();
  }, [dayTypeId, categoryId]);
  
  const handlePress = (subCategoryId) => {
    router.push({pathname: './Places', params: {dayTypeId: dayTypeId, categoryId: categoryId, subCategoryId: subCategoryId}});
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Options Types</Text>
      </View>
      
      <View style={{flex: 1}}>
        <FlatList data={subCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)}>
            <View style={styles.imageContainer}>
              <Image source={{uri: `${item.imageURL}`}} style={styles.image}/>
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
    backgroundColor: '#FFFFFF',
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
    height: '100%',
    borderRadius: 10
  },
})
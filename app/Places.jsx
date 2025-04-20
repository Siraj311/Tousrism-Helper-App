import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Modal, Linking, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from '../constants/Colors';
import { db } from "../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";
import { useLocalSearchParams } from 'expo-router';

const Places = () => {
  const { dayTypeId, categoryId } = useLocalSearchParams();
  const [places, setPlaces] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (!dayTypeId || !categoryId ) return;

        setLoading(true);
  
        // ✅ First, get the parent document reference
        const subCategoryDocRef = doc(db, "dayTypes", dayTypeId, "categories", categoryId);
  
        // ✅ Then, get the subcollection reference
        const placesRef = collection(subCategoryDocRef, "Places");
  
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
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlaces();
  }, [dayTypeId, categoryId]);

  const isPlaceOpen = (openTime, closeTime) => {
    if (!openTime || !closeTime) return false;
  
    const [openHour, openMin] = openTime.split(':').map(Number);
    const [closeHour, closeMin] = closeTime.split(':').map(Number);
  
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const openingTime = openHour * 60 + openMin;
    const closingTime = closeHour * 60 + closeMin;
  
    // Case 1: Normal time range (e.g. 09:00 to 18:00)
    if (closingTime > openingTime) {
      return currentTime >= openingTime && currentTime < closingTime;
    }
  
    // Case 2: Overnight time range (e.g. 21:00 to 05:00)
    return currentTime >= openingTime || currentTime < closingTime;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingTxt}>Places to Visit</Text>
      </View>

      <View style={{flex: 1}}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <FlatList data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}>
              <View style={styles.imageContainer}>
                <Image source={{uri: `${item.imageURL}`}} style={styles.image}/>
              </View>
              <View style={styles.cardTitle}>
                <Text style={styles.cardTitleTxt}>{item.name}</Text>
                <Text style={[styles.cardState, {color: isPlaceOpen(item.openTime, item.closeTime) ? 'green' : 'red'}]}>
                  {isPlaceOpen(item.openTime, item.closeTime) ? 'OPEN' : 'CLOSED'}
                </Text>
              </View>
            </TouchableOpacity>
          )}/>
        )}
      </View>

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedItem.imageURL }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                {isPlaceOpen(selectedItem.openTime, selectedItem.closeTime) ? '🟢 OPEN' : '🔴 CLOSED'}
              </Text>

              <Text>🗺️ Address: {selectedItem.address}</Text>
              <Text style={{ marginTop: 10 }}>📞 Contact: {selectedItem.contactNumber}</Text>

              <Text style={{ marginTop: 10 }}>
              🌐 Website: 
              <Text style={{ color: '#007AFF' }} onPress={() => Linking.openURL(selectedItem.visitPage)}>
                {' '}{selectedItem.visitPage}
              </Text>
            </Text>

              <View style={styles.timeRow}>
                <Text>⏰ Open: {selectedItem.openTime}</Text>
                <Text>⏰ Close: {selectedItem.closeTime}</Text>
              </View>

              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 25,
    paddingRight: 15,
    // backgroundColor: 'green',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // flexDirection: 'row',
    gap: 10
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    // width: '100%',
    // height: 150,
    // borderRadius: 10,
    // marginBottom: 15,

      width: '100%',
      height: 220, // ⬆️ increased from 150
      borderRadius: 10,
      marginBottom: 15,
      resizeMode: 'cover', // ensures proper scaling
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
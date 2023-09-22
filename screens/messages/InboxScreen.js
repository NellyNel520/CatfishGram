import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../../firebase'

// components
import InboxHeader from '../../components/messages/InboxHeader'



const InboxScreen = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    db
    .collection('users')
    .doc(firebase.auth().currentUser.email)
    .onSnapshot((snapshot) => {
      setCurrentUser({uid: firebase.auth().currentUser.email, ...snapshot.data()})
    })
   
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <InboxHeader navigation={navigation} currentUser={currentUser}/>
        
      {/* search bar */}
      {/* messages flatlist */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
})

export default InboxScreen
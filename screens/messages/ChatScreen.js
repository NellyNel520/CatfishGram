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
import ChatHeader from '../../components/messages/ChatHeader'

const ChatScreen = ({navigation, route}) => {
  const { user, currentUser } = route.params
  console.log(user)
  return (
    <SafeAreaView style={styles.container}>
    {/* Header */}
      <ChatHeader navigation={navigation} user={user} />
    {/* Messages */}
    {/* Text Input : (camera, text input, icons: mic, image, sticker?)*/}
    
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
})

export default ChatScreen
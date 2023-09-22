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

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: 'white'}}>ChatScreen</Text>
    
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
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
import { doc, onSnapshot } from 'firebase/firestore'
import { db, firebase } from '../../firebase'

// components
import ChatHeader from '../../components/messages/ChatHeader'
import Messages from '../../components/messages/Messages'
import MessageForm from '../../components/messages/MessageForm'
import MessageForm2 from '../../components/messages/MessageForm2'

const ChatScreen = ({ navigation, route }) => {
	const { user, currentUser,   } = route.params 
  const [clicked, setClicked] = useState(false) 


	const combinedId =
			currentUser.username.length > user.username.length
				? currentUser.owner_uid + user.owner_uid
				: user.owner_uid + currentUser.owner_uid


	

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<ChatHeader navigation={navigation} user={user} />
			{/* Messages */}
			<Messages combinedId={combinedId} user={user} currentUser={currentUser}/>
			{/* Text Input */}

      <MessageForm combinedId={combinedId} user={user} currentUser={currentUser} setClicked={setClicked} clicked={clicked}/>
      {/* <MessageForm2 combinedId={combinedId} user={user} currentUser={currentUser} setClicked={setClicked} clicked={clicked}/> */}
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

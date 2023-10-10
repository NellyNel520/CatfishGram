import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { db, firebase } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

// components
import InboxHeader from '../../components/messages/InboxHeader'

const InboxScreen = ({ navigation }) => {
	const [currentUser, setCurrentUser] = useState({})
	const [chats, setChats] = useState([])

	useEffect(() => {
		db.collection('users')
			.doc(firebase.auth().currentUser.email)
			.onSnapshot((snapshot) => {
				setCurrentUser({
					uid: firebase.auth().currentUser.email,
					...snapshot.data(), 
				})
			})

		const getChats = () => {
			const subscribe = onSnapshot(
				doc(db, 'userChats', firebase.auth().currentUser.email),
				(doc) => {
					setChats(doc.data())
				}
			)
			return () => {
				subscribe()
			}
		}

		getChats()
	}, [])

	// const ItemView = ({item}) => (
	//   <View>

	//   </View>
	// )
	return (
		<SafeAreaView style={styles.container}>
			<InboxHeader navigation={navigation} currentUser={currentUser} />
			{/* search bar */}

			{/* messages flatlist */}
			<Text style={{color: 'white', marginTop: 20, marginHorizontal: 10, fontSize: 20, fontWeight: 700 }}>Messages</Text>
			<ScrollView style={{marginTop: 18,}}>
				{Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map((chat) => (
						<View
							key={chat[0]}
							style={{
								flexDirection: 'row',
								marginBottom: 15,
							}}
						>
							<TouchableOpacity 
              style={{flexDirection: 'row'}}
              // on press nav to chat screen with required params (chat[1].userInfo)
              onPress={() => navigation.navigate('ChatScreen', {user: chat[1].userInfo, currentUser: currentUser})}
              >
								{/* user profile image */}
								<Image
									source={{ uri: chat[1].userInfo.profile_picture }}
									style={styles.profilePic}
								/>
								{/* chat info (username & last message) */}
								<View style={{ marginLeft: 12, marginVertical: 15 }}>
                  <Text style={{ color: 'gray', fontSize: 20 }}>{chat[1].userInfo.username}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>{chat[1].lastMessage?.text}</Text>
                </View>
							</TouchableOpacity>
						</View>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
	profilePic: {
		width: 75,
		height: 75,
		borderRadius: 50,
		marginLeft: 6,
		borderWidth: 1.7,
		borderColor: '#ff8501',
	},
})

export default InboxScreen 

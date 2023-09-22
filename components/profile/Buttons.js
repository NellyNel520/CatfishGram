import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from 'firebase/firestore'
import { firebase, db } from '../../firebase'

const Buttons = ({ userId, isCurrentUser, followers, user, navigation }) => {
	// does followers contain current user email ? if so set isFollowing to true within useEffect
	const [isFollowing, setIsFollowing] = useState()
	const [currentUser, setCurrentUser] = useState({})

	const getCurrentUser = () => {
		const subscribe = db
			.collection('users')
			.doc(firebase.auth().currentUser.email)
			.get()
			.then((doc) => {
				if (doc.exists) {
					console.log('Document data:', doc.data())
					setCurrentUser(doc.data())
				} else {
					console.log('No such document!')
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error)
			})

		return subscribe
	}

	useEffect(() => {
		if (followers.includes(firebase.auth().currentUser.email)) {
			setIsFollowing(true)
		} else {
			setIsFollowing(false)
		}
		getCurrentUser()
	}, [])

	// handel follow & unfollow functions
	const handleFollow = (userId) => {
		// adds current user to users followers list
		db.collection('users')
			.doc(userId)
			.collection('followers')
			.doc(firebase.auth().currentUser.email)
			.set({})
		// adds user to current user's following list
		db.collection('users')
			.doc(firebase.auth().currentUser.email)
			.collection('following')
			.doc(userId)
			.set({})

			.then(() => {
				console.log('Successfully updated !!!')
				// setIsFollowing(true)
				// navigation.navigate('ProfileScreen', { userId: userId })
			})
			.catch((error) => {
				console.error('Error updating document: ', error)
			})
	}

	const handleUnFollow = (userId) => {
		db.collection('users')
			.doc(userId)
			.collection('followers')
			.doc(firebase.auth().currentUser.email)
			.delete()

		db.collection('users')
			.doc(firebase.auth().currentUser.email)
			.collection('following')
			.doc(userId)
			.delete()

			.then(() => {
				console.log('Successfully deleted follow !!!')
				// setIsFollowing(false)
				// navigation.navigate('ProfileScreen', { userId: userId })
			})
			.catch((error) => {
				console.error('Error deleting document: ', error)
			})
	}

	// handel message
	const handelMessage = async () => {
		const date = new Date()
		const timestamp = date.getTime()
		const combinedId = currentUser.username + user.username + timestamp

		try {
			const res = await getDoc(doc(db, 'chats', combinedId))
			if (!res.exists()) {
				//create a chat in chats collection
				await setDoc(doc(db, 'chats', combinedId), { messages: [] })

				//create user chats for both users in the chat
				await updateDoc(
					doc(db, 'userChats', currentUser.email),
					{
						[combinedId + '.userInfo']: {
							email: userId,
							username: user.username,
							profile_picture: user.profile_picture,
						},
						[combinedId + '.date']: serverTimestamp(),
					}
				)

				await updateDoc(doc(db, 'userChats', userId), {
					[combinedId + '.userInfo']: {
						email: firebase.auth().currentUser.email,
						username: currentUser.username,
						profile_picture: currentUser.profile_picture,
					},
					[combinedId + '.date']: serverTimestamp(),
				})

			}
			// then navigate to chat screen 
		} catch (err) {}
	}

	const FollowButton = () => (
		<TouchableOpacity
			style={styles.follow}
			onPress={() => handleFollow(userId)}
		>
			<Text style={styles.buttonText}>Follow</Text>
		</TouchableOpacity>
	)

	const FollowingButton = () => (
		<TouchableOpacity
			style={styles.following}
			onPress={() => handleUnFollow(userId)}
		>
			<Text style={styles.buttonText}>Following</Text>
		</TouchableOpacity>
	)

	const CurrentUserButtons = () => (
		<View style={{ marginTop: 40, flexDirection: 'row' }}>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Edit profile</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Share profile</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.iconButton}>
				<Image
					style={{ width: 30, height: 30 }}
					source={{
						uri: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-add-user-instagram-flatart-icons-outline-flatarticons.png',
					}}
				/>
			</TouchableOpacity>
		</View>
	)

	const UserButtons = () => (
		<View style={styles.buttonContainer}>
			{followers.includes(firebase.auth().currentUser.email) ? (
				<FollowingButton />
			) : (
				<FollowButton />
			)}

			{/* message */}
			<TouchableOpacity style={styles.button} onPress={handelMessage}>
				<Text style={styles.buttonText}>Message</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.iconButton}>
				<Image
					style={{ width: 30, height: 30 }}
					source={{
						uri: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-add-user-instagram-flatart-icons-outline-flatarticons.png',
					}}
				/>
			</TouchableOpacity>
		</View>
	)

	return (
		<View style={{ marginTop: 40, flexDirection: 'row' }}>
			{isCurrentUser ? <CurrentUserButtons /> : <UserButtons />}
		</View>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 40,
		flexDirection: 'row',
		marginHorizontal: 20,
		justifyContent: 'space-between',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#5A5A5A',
		width: 165,
		marginHorizontal: 10,
	},
	follow: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#0080FE',
		width: 165,
		marginRight: 10,
	},
	following: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#5A5A5A',
		width: 165,
		marginRight: 10,
	},
	iconButton: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#5A5A5A',
		padding: 5,
		marginHorizontal: 10,
	},
	buttonText: {
		fontWeight: 600,
		color: '#fff',
		fontSize: 18,
	},
})

export default Buttons

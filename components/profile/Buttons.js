import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'

const Buttons = ({ userId, isCurrentUser, followers }) => {
	const [isFollowing, setIsFollowing] = useState(false)
  // does followers contain current user email ? if so set isFollowing to true within useEffect

	// handel follow & unfollow functions
  const handleFollow =  (userId) => {
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
				// navigation.navigate('ProfileScreen', { userId: userId })
			})
			.catch((error) => {
				console.error('Error updating document: ', error)
			})
	}

  const handleUnFollow =  (userId) => {
    db
     .collection('users')
     .doc(userId)
     .collection('followers')
     .doc(firebase.auth().currentUser.email)
     .delete()

    db
     .collection('users')
     .doc(firebase.auth().currentUser.email)
     .collection('following')
     .doc(userId)
     .delete()

     .then(() => {
       console.log('Successfully deleted follow !!!')
       // navigation.navigate('ProfileScreen', { userId: userId })
     })
     .catch((error) => {
       console.error('Error deleting document: ', error)
     })
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
		
			{/* {isFollowing ? <FollowingButton /> : <FollowButton />} */}
      <FollowButton />


			{/* message */}
			<TouchableOpacity style={styles.button}>
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
		width: 185,
		marginRight: 10,
	},
	follow: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#0080FE',
		width: 185,
		marginRight: 10,
	},
	following: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#5A5A5A',
		width: 185,
		marginRight: 10,
	},
	iconButton: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 42,
		borderRadius: 10,
		backgroundColor: '#5A5A5A',
		padding: 5,
	},
	buttonText: {
		fontWeight: 600,
		color: '#fff',
		fontSize: 18,
	},
})

export default Buttons
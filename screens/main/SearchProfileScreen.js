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
// Components
import SearchUserHeader from '../../components/profile/SearchUserHeader'
import SubHeader from '../../components/profile/SubHeader'
import Bio from '../../components/profile/Bio'
import Buttons from '../../components/profile/Buttons'
import PostGrid from '../../components/profile/PostGrid'

const SearchProfileScreen = ({ navigation, route }) => {
	const { userId } = route.params
	const [isCurrentUser, setIsCurrentUser] = useState(false)
	const [user, setUser] = useState({})
	const [userPosts, setUserPosts] = useState([])
	// const [isFollowing, setIsFollowing] = useState(false)
	let [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])

	const getUser = () => {
		// may need to change doc ref from uid to user email to be consistent
		const docRef = db.collection('users').doc(userId)
		const unsubscribe = docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					console.log('Document data:', doc.data())
					setUser(doc.data())
				} else {
					console.log('No such document!')
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error)
			})
		return unsubscribe
	}

	const getPosts = () => {
		const docRef = db.collection('posts').where('owner_email', '==', userId)
		const unsubscribe = docRef.onSnapshot((snapshot) => {
			setUserPosts(
				snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
			)
		})
		return unsubscribe
	}

  


	useEffect( () => {
		// gets user info
		getUser()
		// gets user post
		getPosts()
		// Checks if userId  is current user
		if (userId === firebase.auth().currentUser.email) {
			setIsCurrentUser(true)
		}

		
		// // ****Gets users following and followers**** icebox
		 db.collection('users')
			.doc(userId)
			.collection('following')
			.onSnapshot((snapshot) => {
        setFollowing(snapshot.docs.map(doc => {
          const id = doc.id
          return id
        }))
			})

		 db.collection('users')
			.doc(userId)
			.collection('followers')
			.onSnapshot((snapshot) => {
				setFollowers(snapshot.docs.map(doc => {
          const id = doc.id
          return id
        }))
			})

		// if (followers.includes(firebase.auth().currentUser.email)) {
		// 	setIsFollowing(true)
		// } else {
		// 	setIsFollowing(false)
		// }
		
	}, [])
	return (
		// pass following & followers to subheader ,  &   followers to buttons
		<SafeAreaView style={styles.container}>
			<SearchUserHeader
				user={user}
				navigation={navigation}
				isCurrentUser={isCurrentUser}
			/>
			<ScrollView>
				<SubHeader
					user={user}
					userPosts={userPosts}
					followers={followers}
					following={following}
				/>
				<Bio user={user} />
				<Buttons
					userId={userId}
					user={user}
					isCurrentUser={isCurrentUser}
          followers={followers}
					navigation={navigation}
				
				/>
				<PostGrid userPosts={userPosts} navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
})

export default SearchProfileScreen

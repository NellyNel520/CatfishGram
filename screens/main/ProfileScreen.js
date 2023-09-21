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
import Header from '../../components/profile/Header'
import SubHeader from '../../components/profile/SubHeader'



const ProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params
  const [userPosts, setUserPosts] = useState([])
	const [isCurrentUser, setIsCurrentUser] = useState(false)
	const [user, setUser] = useState({})
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])



  useEffect(() => {
    // gets user info
    db
    .collection('users')
    .doc(userId)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        setUser({userId: userId, ...snapshot.data()})
        console.log(user)
      }
      setLoading(false)
    })
    // gets user post
    db
    .collection("posts")
    .where('owner_email', '==', userId)
    .onSnapshot((snapshot) => {
      setUserPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })))
    })
    // Checks if userId  is current user 
    if (userId === firebase.auth().currentUser.email) {
      setIsCurrentUser(true)
    }
// ****Gets users following and followers**** icebox 
    // db
    // .collection('users')
    // .doc(userId)
    // .collection('following')
    // .onSnapshot((snapshot) => {
    //   setFollowing(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })))
    // })

    // db
    // .collection('users')
    // .doc(userId)
    // .collection('followers')
    // .onSnapshot((snapshot) => {
    //   setFollowers(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })))
    // })

   

    
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      <Header user={user} navigation={navigation}/>
      <ScrollView>
        <SubHeader user={user} userPosts={userPosts}/>
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

export default ProfileScreen
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
import Bio from '../../components/profile/Bio'
import Buttons from '../../components/profile/Buttons'
import PostGrid from '../../components/profile/PostGrid'


 
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
    .onSnapshot((snapshot) => {
      setUser({uid: userId, ...snapshot.data()})
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
    db
    .collection('users')
    .doc(userId)
    .collection('following')
    .onSnapshot((snapshot) => {
      setFollowing(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })))
    })

    db
    .collection('users')
    .doc(userId)
    .collection('followers')
    .onSnapshot((snapshot) => {
      setFollowers(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })))
    })

   

    
  }, [])



  return (
    // pass following & followers to subheader ,  &   followers to buttons 
    <SafeAreaView style={styles.container}>
      <Header user={user} navigation={navigation}/>
      <ScrollView>
        <SubHeader user={user} userPosts={userPosts} followers={followers} following={following}/>
        <Bio user={user}/>
        <Buttons userId={userId} isCurrentUser={isCurrentUser} followers={followers} navigation={navigation}/>
        <PostGrid userPosts={userPosts}  navigation={navigation}/>
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
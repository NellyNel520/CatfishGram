import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db } from '../../firebase'
// components
import Header from '../../components/feed/Header'
import Stories from '../../components/feed/Stories'
import Post from '../../components/post/Post'



const FeedScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])

	const currentUser = firebase.auth().currentUser.email

	useEffect(() => {
		db.collectionGroup('posts').onSnapshot((snapshot) => {
			setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })))
		})
	}, []) 

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories />

      
			<ScrollView>
				{posts.map((post, index) => (
					<Post post={post} key={index} navigation={navigation}/>
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
})
export default FeedScreen
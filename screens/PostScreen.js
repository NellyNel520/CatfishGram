import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, firebase } from '../firebase'
// components
import Header from '../components/post/Header'
import Post from '../components/post/Post'

const PostScreen = ({ navigation, route }) => {
	const { post } = route.params

  
    // onSnapshot call for post and pass to children only need post.id from route not entire object for instant updates
    // **********page is attempting to display before running function : needs work***************

  // const [ post, setPost ] = useState({})
	// console.log(post.user)
	// useEffect(() => {
  //   const getPost = () => {

  //     const unsubscribe = db
  //     .collection('posts')
	// 		.doc(postId)
	// 		.onSnapshot((snapshot) => {
  //       setPost({ id: postId, ...snapshot.data() })
	// 		})
  //     return unsubscribe
  //   }
  //   getPost()

	// }, [])

	return (
		<SafeAreaView style={styles.container}>
			<Header post={post} navigation={navigation} />
			<Post post={post} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
})

export default PostScreen

import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, firebase } from '../firebase'
// components
import PostScreenHeader from '../components/post/PostScreenHeader'
import Post from '../components/post/Post'

const PostScreen = ({ navigation, route }) => {
	const { post} = route.params
		
	
	
	
	console.log(post)
	return (
		<SafeAreaView style={styles.container}>
			<PostScreenHeader post={post} navigation={navigation} />
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

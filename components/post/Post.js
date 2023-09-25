import {
	View,
	Text,
	Image,
	StyleSheet,
	Touchable,
	TouchableOpacity,
	ScrollView,
	Modal,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase, db } from '../../firebase'
// ***components***
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostFooter from './PostFooter'
import CommentSection from '../comments/CommentSection'
import Likes from './Likes'
import Caption from './Caption'
import AllComments from '../comments/AllComments'
import ModalHeader from '../comments/ModalHeader'



const Post = ({ post, navigation }) => {
	const [comments, setComments] = useState([])
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		db.collection('posts')
			.doc(post.id)
			.collection('comments')
			.onSnapshot((snapshot) => {
				setComments(
					snapshot.docs.map((comment) => ({
						id: comment.id,
						...comment.data(),
					}))
				)
			})
	}, [])

	const handleLike = (post) => {
		const currentLikeStatus = !post.likes_by_users.includes(
			firebase.auth().currentUser.email
		)

		db.collection('posts')
			.doc(post.id)
			.update({
				likes_by_users: currentLikeStatus
					? firebase.firestore.FieldValue.arrayUnion(
							firebase.auth().currentUser.email
					  )
					: firebase.firestore.FieldValue.arrayRemove(
							firebase.auth().currentUser.email
					  ),
			})
			.then(() => {
				console.log('Successfully updated !!!')
			})
			.catch((error) => {
				console.error('Error updating document: ', error)
			})
	}


	


	return (
		<ScrollView>
			<PostHeader post={post} navigation={navigation} />
			<PostImage post={post} />
			<View style={{ marginHorizontal: 2, marginTop: 10 }}>
				<PostFooter
					post={post}
					comments={comments}
					handleLike={handleLike}
					setModalVisible={setModalVisible}
					modalVisible={modalVisible}
				/>
				<Likes post={post} />
				<Caption post={post} />

				<CommentSection post={post} setModalVisible={setModalVisible}
					modalVisible={modalVisible}/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	story: {
		width: 35,
		height: 35,
		borderRadius: 50,
		marginLeft: 6,
		borderWidth: 1.7,
		borderColor: '#ff8501',
	},
	footerIcon: {
		width: 33,
		height: 33,
		marginRight: 6,
	},
	leftFooterIconContainer: {
		flexDirection: 'row',
		width: '32%',
		justifyContent: 'space-between',
	},
	headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		marginTop: 10,
	},
})

export default Post

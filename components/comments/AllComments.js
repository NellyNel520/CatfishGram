import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React from 'react'
import { firebase, db } from '../../firebase'
// components \\
import CommentForm from './CommentForm'

const likeIcons = [
	{
		imageUrl: 'https://img.icons8.com/ios/50/ffffff/like--v1.png',
		likedImageUrl: 'https://img.icons8.com/ios-filled/50/F32424/like--v1.png',
	},
]

const AllComments = ({ post, comments }) => {
	const handleCommentLike = (comment) => {
		const currentLikeStatus = !comment.likes_by_users.includes(
			firebase.auth().currentUser.email
		)

		db.collection('posts')
			.doc(post.id)
			.collection('comments')
			.doc(comment.id)
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

	const LikeButton = ({ comment, handleCommentLike }) => (
		<TouchableOpacity onPress={() => handleCommentLike(comment)}>
			<Image
				source={{
					uri: comment.likes_by_users.includes(
						firebase.auth().currentUser.email
					)
						? likeIcons[0].likedImageUrl
						: likeIcons[0].imageUrl,
				}}
				style={{ width: 20, height: 20 }}
			/>
		</TouchableOpacity>
	)
	return (
		// <KeyboardAvoidingView behavior="padding" >
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

		
			<View 
			style={{ marginHorizontal: 7, marginTop: 25, height: '90%' }}
			>
				<ScrollView>
					{/* style layout needs work so text input pushes up above keyboard and not hidden for add comment form in modal */}

					{comments.length > 0 ? (
						comments.map((comment, index) => (
							<View key={index} style={{ height: '45%' }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity>
											<Image
												source={{ uri: comment.profile_picture }}
												style={styles.story}
											/>
										</TouchableOpacity>

										<View style={{ marginLeft: 8 }}>
											<View style={{ flexDirection: 'row' }}>
												<Text
													style={{
														fontWeight: 600,
														color: 'white',
														fontSize: 15,
														marginRight: 3,
													}}
												>
													{comment.user}
												</Text>
												{/* instal timeago package to convert timestamp */}
												<Text>15h</Text>
												{/* not working as expected will revisit */}
												{/* <Text>{moment(comment.createdAt).fromNow()}</Text> */}
											</View>

											<Text
												style={{ fontSize: 16, color: 'white', marginTop: 4 }}
											>
												{comment.comment}
											</Text>

											{/* likes with conditional statement same in post componnt like section*/}

											{comment.likes_by_users.length > 0 ? (
												<Text>
													<Text>{comment.likes_by_users.length} </Text>
													<Text style={{ textDecorationLine: 'underline' }}>
														likes
													</Text>
												</Text>
											) : null}
										</View>
									</View>

									{/* handle like function */}
									<View>
										<LikeButton
											comment={comment}
											handleCommentLike={handleCommentLike}
										/>
									</View>
								</View>
							</View>
						))
					) : (
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 20 }}>No Comments</Text>
						</View>
					)}
				</ScrollView>
				<CommentForm post={post} />
			</View>
	// 		</TouchableWithoutFeedback>
	// 	</KeyboardAvoidingView>
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
})

export default AllComments

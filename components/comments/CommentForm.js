import {
	View,
	Text,
	Image,
	TextInput,
	Button,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { firebase, db } from '../../firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const uploadCommentSchema = Yup.object().shape({
	comment: Yup.string()
		.required()
		.max(2200, 'Comment has reached the character limit'),
})

const CommentForm = ({ post }) => {
	const [username, setUsername] = useState('')
	const [profilePic, setProfilePic] = useState('')

	const getUsername = () => {
		// may need to change doc ref from uid to user email to be consistent
		const user = firebase.auth().currentUser.email
		const docRef = db.collection('users').doc(user)
		const unsubscribe = docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					// console.log('Document data:', doc.data())
					setUsername(doc.data().username)
					setProfilePic(doc.data().profile_picture)
				} else {
					console.log('No such document!')
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error)
			})
		return unsubscribe
	}

	useEffect(() => {
		getUsername()
	}, [])

	const uploadCommentToFirebase = (comment) => {
		const unsubscribe = db
			.collection('posts')
			.doc(post.id)
			.collection('comments')
			.add({
				user: username,
				profile_picture: profilePic,
				comment: comment,
				owner_uid: firebase.auth().currentUser.uid,
				owner_email: firebase.auth().currentUser.email,
				createdAt: new Date(),
				likes_by_users: [],
			})

		return unsubscribe
	}
	return (
		<Formik
			initialValues={{ comment: '' }}
			onSubmit={(values) => {
				// console.log(values)
				// console.log('Your Comment was submitted successfully 🎉')

				uploadCommentToFirebase(values.comment)
			}}
			validationSchema={uploadCommentSchema}
			validateOnMount={true}
		>
			{({
				handleBlur,
				handleChange,
				handleSubmit,
				values,
				errors,
				isValid,
			}) => (
				<>
					<View style={styles.wrapper}>
						<View style={{ flexDirection: 'row' }}>
							<Image source={{ uri: profilePic }} style={styles.story} />

							<View style={{ flex: 1 }}>
								<TextInput
									style={styles.inputField}
									placeholder="Write a Comment"
									placeholderTextColor="gray"
									multiline={true}
									onChangeText={handleChange('comment')}
									onBlur={handleBlur('comment')}
									value={values.comment}
								/>
								{/* error message for form validation */}
							</View>

							<Button title="Post" disabled={!isValid} onPress={handleSubmit} />
						</View>
					</View>
				</>
			)}
		</Formik>
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
		marginRight: 10,
	},
	inputField: {
		borderRadius: 15,
		padding: 12,
		marginBottom: 10,
		borderWidth: 2.5,
		color: 'white',
		fontSize: 20,
	},
	wrapper: {
		position: 'relative',
		width: '100%',

		// marginVertical: 10,
		// marginTop: 120
		flex: 1,
		// backgroundColor: '#000000',
	},
})

export default CommentForm

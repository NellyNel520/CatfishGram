import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	Button,
} from 'react-native'

import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { storage, db, firebase } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'


const uploadPostSchema = Yup.object().shape({
	caption: Yup.string().max(2200, 'Caption has reached the character limit'),
})

const Header = ({ navigation }) => (
	<View style={styles.headerContainer}>
		<TouchableOpacity onPress={() => navigation.goBack()}>
			<Image
				source={{ uri: 'https://img.icons8.com/ios/90/ffffff/back--v1.png' }}
				style={{ width: 30, height: 30 }}
			/>
		</TouchableOpacity>
		<Text style={styles.headerText}>NEW POST</Text>
		<Text></Text>
		{/* empty text component to center tittle */}
	</View>
)

const SubmitPostScreen = ({ navigation, route }) => {
	const { image } = route.params
	console.log(image)
	const [err, setErr] = useState(false)
	const [username, setUsername] = useState('')
	const [profilePic, setProfilePic] = useState('')
  const date = new Date
  const timestamp = date.getTime()

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
		console.log(username)
		console.log(profilePic)
	}, [])

	const uploadPost = async (image, caption) => {
		// may need to add doc ref  with user id to organize post better line 74
		// .collection('posts).doc(firebase.auth().currentUser.email).collection("userPosts").add()
		const uploadToFirestoreDatabase = (downloadURL) => {
			const unsubscribe = db
				.collection('posts')
				.doc(`${firebase.auth().currentUser.email + timestamp}`)
				.set({
					imageUrl: downloadURL,
					user: username,
					profile_picture: profilePic,
					owner_uid: firebase.auth().currentUser.uid,
					owner_email: firebase.auth().currentUser.email,
					caption: caption,
					createdAt: new Date(),
					likes_by_users: [],
				})
				// navigates back to the top of the stack
				.then(() => navigation.popToTop())
			return unsubscribe
		}

		try {
			const uri = image
			const response = await fetch(uri)
			const blob = await response.blob()
			const date = new Date().getTime()
			// child ref for organizing post by user
			const storageRef = ref(
				storage,
				`${firebase.auth().currentUser.email + date}`
			)
			const uploadTask = uploadBytesResumable(storageRef, blob)

			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log('Upload is ' + progress + '% done')
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused')
							break
						case 'running':
							console.log('Upload is running')
							break
					}
				},
				(error) => {
					setErr(true)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						console.log('File available at', downloadURL)
						uploadToFirestoreDatabase(downloadURL)
					})
				}
			)
		} catch {
			setErr(true)
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} />

			<Formik
				initialValues={{ caption: '' }}
				onSubmit={(values) => {
					uploadPost(image, values.caption)
					// console.log(values)
					// console.log('Your Post was submitted successfully 🎉')
				}}
				validationSchema={uploadPostSchema}
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
						<View
							style={{
								margin: 20,
								justifyContent: 'space-between',
								flexDirection: 'row',
							}}
						>
							<Image
								source={{
									uri: image,
								}}
								style={{ width: 100, height: 100 }}
							/>
							<View style={{ flex: 1, marginLeft: 12 }}>
								<TextInput
									style={{ color: 'white', fontSize: 20 }}
									placeholder="Write a Caption"
									placeholderTextColor="gray"
									multiline={true}
									onChangeText={handleChange('caption')}
									onBlur={handleBlur('caption')}
									value={values.caption}
								/>
							</View>
						</View>

						<Button onPress={handleSubmit} title="Share" disabled={!isValid} />
					</>
				)}
			</Formik>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
		// justifyContent: 'center',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 20,
		marginRight: 25,
	},
})
export default SubmitPostScreen

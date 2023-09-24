import {
	View,
	Text,
	Image,
	TextInput,
	Button, 
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	Keyboard,
} from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { firebase, db, storage } from '../../firebase'
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'

const uploadMessageSchema = Yup.object().shape({
	message: Yup.string().max(4200, 'Comment has reached the character limit'),
})

const MessageForm = ({
	combinedId,
	user,
	currentUser,
	clicked,
	setClicked,
}) => {
	const [image, setImage] = useState(null)
	const [err, setErr] = useState(false)
	const date = new Date()
	const timestamp = date.getTime()

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		console.log(result)

		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	const sendMessage = async (image, text) => {
		if (image) {
			const uri = image
			const response = await fetch(uri)
			const blob = await response.blob()
			const storageRef = ref(
				storage,
				`${firebase.auth().currentUser.email + timestamp}`
				// 	`${firebase.auth().currentUser.email + 'messageto' + user.email + timestamp}`
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
						await updateDoc(doc(db, 'chats', combinedId), {
							messages: arrayUnion({
								id: currentUser.owner_uid + timestamp,
								text,
								senderId: currentUser.uid,
								date: date,
								image: downloadURL,
							}),
						})
					})
				}
			)
		} else {
			await updateDoc(doc(db, 'chats', combinedId), {
				messages: arrayUnion({
					id: currentUser.owner_uid + timestamp,
					text,
					senderId: currentUser.uid,
					date: date,
				}),
			})
		}

		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[combinedId + '.lastMessage']: {
				text,
			},
			[combinedId + '.date']: serverTimestamp(),
		})

		await updateDoc(doc(db, 'userChats', user.uid), {
			[combinedId + '.lastMessage']: {
				text,
			},
			[combinedId + '.date']: serverTimestamp(),
		}) 

		// setText('')
		// setImage(null)
	}

	return (
		<View>
			<Formik
				initialValues={{ text: '' }}
				onSubmit={(values, ) => {
					sendMessage(image, values.text)
					setImage(null)
					// resetForm({values: initialValues})


					// console.log(values)
					// console.log('Your Post was submitted successfully 🎉')
				}}
				validationSchema={uploadMessageSchema}
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
							<View style={{ flexDirection: 'row', marginTop: 10 }}>
								{/* camera icon */}
								{/* ICEBOX idea ***may create a seperate camera screen to nav to and then send image to chat screen to send in message  */}
								<TouchableOpacity>
									<View style={styles.cameraBg}>
										<Image
											source={{
												uri: 'https://img.icons8.com/ios-filled/50/ffffff/camera--v1.png',
											}}
											style={{ width: 30, height: 30 }}
										/>
									</View>
								</TouchableOpacity>
								<View style={{ flex: 1 }}>
									<TextInput
										style={styles.inputField}
										placeholder="Message..."
										placeholderTextColor="gray"
										multiline={true}
										onChangeText={handleChange('text')}
										onBlur={handleBlur('text')}
										value={values.text}
										onFocus={() => {
											setClicked(true)
										}}
									></TextInput>
									{/* conditionally render image if selected */}
									{image && (
										<View>
											<Image
												source={{ uri: image }}
												style={{ width: 150, height: 150 }}
											/>
										</View>
									)}
								</View>

								<View
									style={{
										flex: 'end',
										// flexDirection: 'row',
										// justifyContent: 'space-between',
									}}
								>
									{/* icons */}
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										{/* mic */}
										<TouchableOpacity>
											<Image
												source={{
													uri: 'https://img.icons8.com/ios/50/ffffff/microphone.png',
												}}
												style={{ width: 29, height: 29 }}
											/>
										</TouchableOpacity>
										{/* image */}
										<TouchableOpacity onPress={pickImage}>
											<Image
												source={{
													uri: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/image--v1.png',
												}}
												style={{ width: 35, height: 35 }}
											/>
										</TouchableOpacity>
										{/* sticker */}
										<TouchableOpacity>
											<Image
												source={{
													uri: 'https://img.icons8.com/color/48/sticker-square.png',
												}}
												style={{ width: 35, height: 35 }}
											/>
										</TouchableOpacity>
									</View>

									{clicked || image ? (
										<View style={{ alignItems: 'center', marginTop: 5 }}>
											<Button
												onPress={handleSubmit}
												title="Send"
												disabled={!isValid}
											/>
										</View>
									) : null}
								</View>
							</View>
						</View>
					</>
				)}
			</Formik>
		</View>
	)
}

const styles = StyleSheet.create({
	inputField: {
		// borderRadius: 15,
		// borderWidth: 2.5,
		padding: 12,
		marginBottom: 10,
		color: 'white',
		fontSize: 25,
	},
	wrapper: {
		backgroundColor: '#3A3B3C',
		borderRadius: 35,
		borderWidth: 2.5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 4,
		position: 'relative',
	},
	cameraBg: {
		backgroundColor: '#324AB2',
		// position: 'absolute',
		// left: 20,
		bottom: 5,
		marginLeft: 3,
		width: 55,
		height: 55,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		// zIndex: 100,
	},
})

export default MessageForm

import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase, db } from '../../firebase'
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from 'firebase/firestore'
import { TextInput } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements'

const EditForm = () => {
	const [userInfo, setUserInfo] = useState({})
	// form state
	
	// ***
	const [updatedName, setUpdatedName] = useState('')
	const [updatedUsername, setUpdatedUsername] = useState('')
	const [updatedBio, setUpdatedBio] = useState('')

	const getUserInfo = () => {
		const user = firebase.auth().currentUser.email
		const docRef = db.collection('users').doc(user)
		const unsubscribe = docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					// console.log('Document data:', doc.data())
					setUserInfo(doc.data())
					setFormState(doc.data())
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
		getUserInfo()
	}, [])



	const updateProfile = async (event) => {
		event.preventDefault()
		await updateDoc(doc(db, 'users', firebase.auth().currentUser.email), {
			// name: formState.name,
			// username: formState.username,
			// bio: formState.bio,
		})


		
	}

	console.log(userInfo)

	return (
		<View>
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.formLabel}>Name</Text>
				<View>
					<TextInput
						placeholderTextColor="#ffffff"
						placeholder={userInfo.name}
						autoCapitalize="none"
						textContentType="name"
						onChangeText={(text) => setUpdatedName(text)}
					
						clearButtonMode="always"
						style={styles.textInput}
					/>
					<Divider width={1} orientation="horizontal" color="#151515" />
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.formLabel}>Username</Text>

				<View>
					<TextInput
						placeholderTextColor="#ffffff"
						placeholder={userInfo.username}
						autoCapitalize="none"
						textContentType="name"
						onChangeText={(text) => setUpdatedUsername(text)}
						clearButtonMode="always"
						style={styles.textInput}
					/>
					<Divider width={1} orientation="horizontal" color="#151515" />
				</View>
			</View>

			{/* non functional */}
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.formLabel}>Pronouns</Text>

				<View>
					<TextInput
						placeholderTextColor="#444"
						placeholder="Pronouns"
						autoCapitalize="none"
						textContentType="name"
						// onChangeText={(text) => setUpdatedUsername(text)}
						clearButtonMode="always"
						style={styles.textInput}
					/>
					<Divider width={1} orientation="horizontal" color="#151515" />
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.formLabel}>Bio</Text>

				<View>
					<TextInput
						placeholderTextColor="#ffffff"
						placeholder={userInfo.bio ? userInfo.bio : 'Bio'}
						autoCapitalize="none"
						multiline="true"
						textContentType="name"
						onChangeText={(text) => setUpdatedBio(text)}
						clearButtonMode="always"
						style={styles.textInput}
					/>
					<Divider width={1} orientation="horizontal" color="#151515" />
				</View>
			</View>

			{/* non functional */}
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.formLabel}>Links</Text>

				<View>
					<TextInput
						placeholderTextColor="#444"
						placeholder="Links"
						autoCapitalize="none"
						textContentType="name"
						// onChangeText={(text) => setUpdatedUsername(text)}
						clearButtonMode="always"
						style={styles.textInput}
					/>
          <Divider width={1} orientation="horizontal" color="#151515" />
				
				</View>
			</View>

			{/* non functional */}
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.formLabel}>Gender</Text>

				<View>
					<TextInput
						placeholderTextColor="#444"
						placeholder="Optional"
						autoCapitalize="none"
						textContentType="name"
						// onChangeText={(text) => setUpdatedUsername(text)}
						clearButtonMode="always"
						style={styles.textInput}
					/>
					<Divider width={1} orientation="horizontal" color="#151515" />
				</View>
			</View>

      <Divider width={1} orientation="horizontal" color="#151515" />
		</View>
	)
}

const styles = StyleSheet.create({
	formLabel: {
		color: 'white',
		fontWeight: 800,
		fontSize: 24,
		width: '35%',
		marginLeft: 14,
		marginVertical: 18,
	},
	textInput: {
		fontSize: 24,
		color: 'white',
		width: 250,
		marginVertical: 18,
	},
})

export default EditForm

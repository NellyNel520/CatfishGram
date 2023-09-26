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
import { Divider } from 'react-native-elements'

const ProfilePic = () => {
	const [profilePic, setProfilePic] = useState('')
	// const [newProfilePic, setNewProfilePic] = useState('')
	const [modalVisible, setModalVisible] = useState(false)

	const getProfilePic = () => {
		const user = firebase.auth().currentUser.email
		const docRef = db.collection('users').doc(user)
		const unsubscribe = docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					// console.log('Document data:', doc.data())
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
		getProfilePic()
	}, [])

	const ModalHeader = ({ modalVisible, setModalVisible }) => (
		<View style={{ marginTop: 10 }}>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
					<Image
						source={{
							uri: 'https://img.icons8.com/sf-black/128/horizontal-line.png',
						}}
						style={{ width: 80, height: 40 }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)

	const ModalButtons = () => (
		<View style={{marginTop: 15}}>

			{/* pick from library */}
				<TouchableOpacity
					style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 15, marginBottom: 20 }}
				>
					<Image
						source={{
							uri: 'https://img.icons8.com/sf-regular-filled/48/ffffff/image.png',
						}}
						style={{ width: 50, height: 50 }}
					/>
					<Text style={{fontSize: 25, marginTop: 10, marginLeft: 15, color: 'white' }}>Choose from library</Text>
				</TouchableOpacity>


			{/* import from facebook */}
			<TouchableOpacity
					style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 15, marginBottom: 20}}
				>
					<Image
						source={{
							uri: 'https://img.icons8.com/ios/50/ffffff/facebook-new.png',
						}}
						style={{ width: 50, height: 50 }}
					/>
					<Text style={{fontSize: 25, marginTop: 10, marginLeft: 15, color: 'white' }}>Import from Facebook</Text>
				</TouchableOpacity>


			{/* take photo
      ***nav to camera screen then next button sends newProfilePic back to edit screen as param,
      conditionally render newProfilePic if present instead of current photo*** */}
      <TouchableOpacity
					style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20, marginBottom: 20}}
				>
					<Image
						source={{
							uri: 'https://img.icons8.com/ios/50/ffffff/camera--v4.png',
						}}
						style={{ width: 40, height: 40 }}
					/>
					<Text style={{fontSize: 25, marginTop: 10, marginLeft: 20, color: 'white' }}>Take photo</Text>
				</TouchableOpacity>


			{/* Delete current photo
			 ***on delete =>  replace image with avatar image edit instead of delete !!! ****
			 */}
       <TouchableOpacity
					style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 15, marginBottom: 20}}
				>
					<Image
						source={{
							uri: 'https://img.icons8.com/fluency-systems-regular/48/ff0000/trash--v1.png',
						}}
						style={{ width: 50, height: 50 }}
					/>
					<Text style={{fontSize: 25, marginTop: 10, marginLeft: 15, color: '#ff0000' }}>Remove current picture</Text>
				</TouchableOpacity>

		</View>
	)

	const EditButton = ({ modalVisible, setModalVisible }) => (
		<View>
			{/* photo menu modal */}
			<Modal animationType="slide" transparent={true} visible={modalVisible}>
				<View
					style={{
						// marginHorizontal: 20,
						marginTop: 570,
						backgroundColor: '#3A3B3C',
						borderRadius: 15,
						flex: 1,
					}}
				>
					<View>
						<ModalHeader
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
						/>
						<ModalButtons />
					</View>
				</View>
			</Modal>

			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Text
					style={{
						color: '#3388FF',
						fontSize: 20,
						marginLeft: 20,
						marginTop: 15,
					}}
				>
					Edit picture
				</Text>
			</TouchableOpacity>
		</View>
	)

	return (
		<View style={{ marginTop: 20 }}>
			<Divider width={1} orientation="horizontal" color="#3A3B3C" />
			<View
				style={{
					marginTop: 25,
					marginBottom: 15,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Image source={{ uri: profilePic }} style={styles.profilePic} />
				<EditButton
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			</View>

			<Divider width={1} orientation="horizontal" color="#3A3B3C" />

			{/* profile pic  */}
			{/* button ***triggers modal***  */}
		</View>
	)
}

const styles = StyleSheet.create({
	profilePic: {
		width: 120,
		height: 120,
		borderRadius: 70,
		marginLeft: 18,
		borderWidth: 3,
		// border color for active story
		// borderColor: '#ff8501',
	},
})

export default ProfilePic

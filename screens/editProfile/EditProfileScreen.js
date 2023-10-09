import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import Header from '../../components/editProfile/Header'
import ProfilePic from '../../components/editProfile/ProfilePic'
import EditForm from '../../components/editProfile/EditForm'
import { ScrollView } from 'react-native-gesture-handler'

const EditProfileScreen = ({ navigation, route }) => {
	// may be best to mange state here and pass down to requried props
	// **new profile pic , updated name, updated username, updated bio reset is non functional comps to match the style of the current app 


					// ** WORKS for pic image need to change camera screen to modal **
	const [newProfilePic, setNewProfilePic] = useState(null)
	// const [updatedName, setUpdatedName] = useState('')
	// const [updatedUsername, setUpdatedUsername] = useState('')
	// const [updatedBio, setUpdatedBio] = useState('')


	// firebase call to submit updated values only to prevent error **look up & double check
	const updateProfile = () => {

	}


	// useEffect(() => {
	// 	if (image) {
	// 		setNewProfilePic(image)
	// 	} else {
	// 		setNewProfilePic(null)
	// 	}
	// }),

	const OtherButtons = () => (
		<View>
			<TouchableOpacity>
				<Text style={styles.buttonText}>Switch to professional account </Text>
			</TouchableOpacity>
			<Divider width={1} orientation="horizontal" color="#444" />

			<TouchableOpacity>
				<Text style={styles.buttonText}>Personal information settings</Text>
			</TouchableOpacity>

			<Divider width={1} orientation="horizontal" color="#444" />

			<TouchableOpacity>
				<Text style={styles.buttonText}>Sign up for Meta Verified</Text>
			</TouchableOpacity>

			<Divider width={1} orientation="horizontal" color="#444" />
		</View>
	)
	return (
		<SafeAreaView style={styles.container}>
			{/* header */}
			<Header navigation={navigation} />
			{/* profile pic */}
			<ScrollView>
			<ProfilePic navigation={navigation} setNewProfilePic={setNewProfilePic} newProfilePic={newProfilePic} />
				<EditForm 
			// setUpdatedName={setUpdatedName} setUpdatedUsername={setUpdatedUsername} setUpdatedBio={setUpdatedBio}

			/>
				<OtherButtons />
			</ScrollView>

			{/* edit form  */}
			{/* links / buttons  */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
		// justifyContent: 'center',
	},
	buttonText: {
		color: '#3388FF',
		fontSize: 25,
		marginVertical: 25,
		marginLeft: 15

	},
})

export default EditProfileScreen

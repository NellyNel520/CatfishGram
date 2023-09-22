import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const ChatHeader = ({ navigation, user }) => {
	// arrow,
	// user pic user display name & username,
	// icons: phone video

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity style={{ marginRight: 10, marginVertical: 10 }}>
					<Image
						source={{
							uri: 'https://img.icons8.com/ios/90/ffffff/back--v1.png',
						}}
						style={{ width: 30, height: 30 }}
					/>
				</TouchableOpacity>

				<View style={{ flexDirection: 'row' }}>
					<Image
						source={{ uri: user.profile_picture }}
						style={styles.profilePic}
					/>
					<View style={{ marginLeft: 10 }}>
						<Text style={styles.name}>{user.name}</Text>
						<Text style={styles.username}>{user.username}</Text>
					</View>
				</View>
			</View>

			{/* Icons */}
			<View style={{ flexDirection: 'row'}}>
				<TouchableOpacity>
					<Image
						source={{
							uri: 'https://img.icons8.com/ios/50/ffffff/phone--v1.png',
						}}
						style={{ width: 35, height: 35, marginRight: 8 }}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Image source={{ uri: 'https://img.icons8.com/ios/50/ffffff/video-call.png' }} style={{ width: 40, height: 40 }}/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		marginHorizontal: 10,
	},
	profilePic: {
		width: 55,
		height: 55,
		borderRadius: 50,
		marginLeft: 6,
		borderWidth: 1.7,
		borderColor: '#ff8501',
	},
	name: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		textDecorationLine: 'underline',
	},
	username: {
		color: 'gray',
		fontSize: 22,
		marginTop: 3,
	},
})

export default ChatHeader

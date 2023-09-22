import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const InboxHeader = ({ navigation, currentUser }) => {
	console.log(currentUser, 'here')
	return (
		// back arrow
		// username (underlined)
		// notepad & pen icon
		<View style={styles.container}>
			<View style={{flexDirection: 'row'}}>
				{/* back arrow */}
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image 
						source={{
							uri: 'https://img.icons8.com/ios/90/ffffff/back--v1.png',
						}}
						style={{ width: 30, height: 30 }}
					/>
				</TouchableOpacity>
				{/* username */}
				<Text style={styles.username}>{currentUser.username}</Text>
			</View>

      <TouchableOpacity>
        <Image source={{uri: 'https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/ffffff/external-Write-email-tanah-basah-glyph-tanah-basah.png'}} style={{ width: 35, height: 35 }}/>
      </TouchableOpacity>
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
	username: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		textDecorationLine: 'underline',
    marginLeft: 10,
		// marginTop: 10,
	},
})

export default InboxHeader

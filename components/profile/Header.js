import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'


const Header = ({ user, navigation }) => {
	return (
		<View style={styles.container}>
			{/* username + down arrow */}
			<TouchableOpacity style={{ flexDirection: 'row', marginLeft: 3 }}>
				<Text style={styles.headerText}>{user.username}</Text>
				<Image
					style={{
						width: 15,
						height: 15,
						marginTop: 10,
						marginLeft: 5,
						fontWeight: 700,
					}}
					source={{
						uri: 'https://img.icons8.com/ios-filled/50/ffffff/expand-arrow--v1.png',
					}}
				/>
			</TouchableOpacity>

			{/* add & menu icon */}
			<View style={styles.iconsContainer}>
				<TouchableOpacity onPress={() => navigation.navigate('NewPostScreen')}>
					<Image
						style={styles.icon}
						source={{
							uri: 'https://img.icons8.com/ios/50/ffffff/plus-2-math.png',
						}}
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<Image
						style={styles.icon}
						source={{
							uri: 'https://img.icons8.com/ios-filled/50/ffffff/menu--v6.png',
						}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
		marginLeft: 19,
		resizeMode: 'contain',
	},
	headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		textDecorationLine: 'underline',
		// marginTop: 10,
	},
	iconsContainer: {
		flexDirection: 'row',
	},
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		marginHorizontal: 20,
	},
})

export default Header

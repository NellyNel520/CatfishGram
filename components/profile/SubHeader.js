import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

const SubHeader = ({ user, userPosts, followers, following }) => {

	return (
		<View style={styles.container}> 
			<TouchableOpacity>
				<Image
					style={styles.profilePic}
					source={{ uri: user.profile_picture }}
				/>
			</TouchableOpacity>

			<View style={styles.countContainer}>
				{/* post count */}
				<TouchableOpacity style={styles.count}>
					<Text style={styles.number}>{userPosts.length}</Text>
					<Text style={styles.countTitle}>Posts</Text>
				</TouchableOpacity>
				{/* Followers */}
				<TouchableOpacity style={styles.count}>
					<Text style={styles.number}>{followers.length}</Text>
					<Text style={styles.countTitle}>Followers</Text>
				</TouchableOpacity>
				{/* Following */}
				<TouchableOpacity style={styles.count}>
					<Text style={styles.number}>{following.length}</Text>
					<Text style={styles.countTitle}>Following</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	profilePic: {
		width: 110,
		height: 110,
		borderRadius: 70,
		marginLeft: 18,
		borderWidth: 3,
		// border color for active story
		// borderColor: '#ff8501',
	},
	countContainer: {
		flexDirection: 'row',
		marginTop: 40,
		marginRight: 20,
	},
	count: {
		marginRight: 10,
		marginLeft: 8,
		alignItems: 'center',
	},
	countTitle: {
		color: 'white',
		fontSize: 15,
		fontWeight: 600,
	},
	number: {
		color: 'white',
		fontWeight: 800,
		fontSize: 20,
	},
})

export default SubHeader

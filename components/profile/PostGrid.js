import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'

const PostGrid = ({ navigation, userPosts }) => {
	const TabIcons = () => (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginHorizontal: 60,
				marginTop: 30,
			}}
		>
			{/* <Text style={{color: 'white'}}>TopTabs</Text> */}

			<TouchableOpacity>
				<Image
					style={styles.icon}
					source={{ uri: 'https://img.icons8.com/small/16/ffffff/grid.png' }}
				/>
			</TouchableOpacity>

			<TouchableOpacity>
				<Image
					style={styles.icon}
					source={{
						uri: 'https://img.icons8.com/ios/50/ffffff/instagram-reel.png',
					}}
				/>
			</TouchableOpacity>

			<TouchableOpacity>
				<Image
					style={styles.icon}
					source={{
						uri: 'https://img.icons8.com/windows/32/ffffff/user-location.png',
					}}
				/>
			</TouchableOpacity>
		</View>
	)

	const Grid = ({ userPosts, navigation }) => (
		<View
			style={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				marginHorizontal: 0,
				marginTop: 15,
			}}
		>
			{/* conditional render no post yet post.length = 0 */}

			{userPosts.length > 0 ? (
				userPosts.map((post, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							navigation.navigate('PostScreen', {
								post: post,
								
							})
						}}
					>
						<Image
							style={{ width: 130, height: 130 }}
							source={{ uri: post.imageUrl }}
						/>
					</TouchableOpacity>
				))
			) : (
				<View style={styles.noPostContainer}>
					<View style={styles.cameraBorder}>
						<Image
							source={{
								uri: 'https://img.icons8.com/ios/50/ffffff/camera--v3.png',
							}}
							style={styles.camera}
						/>
					</View>
					<View>
						<Text style={styles.noPostText}>No Posts Yet</Text>
					</View>
				</View>
			)}
		</View>
	)

	return (
		<View>
			{/* will add tab navigation as icebox feature */}
			<TabIcons />
			{/* post grid */}
			<ScrollView>
				<Grid navigation={navigation} userPosts={userPosts} />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	noPostContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	icon: {
		width: 40,
		height: 40,
	},
	camera: {
		width: 60,
		height: 60,
		margin: 18,
    // borderWidth: 2,
    // borderColor: 'white',
		// borderRadius: 50,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	cameraBorder: {
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noPostText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		marginTop: 10,
		// width: '100%',
	},
})

export default PostGrid

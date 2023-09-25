import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const PostHeader = ({post, navigation}) => {
  return (
    <View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between', 
				// margin: 5,
				marginTop: 16,
				marginBottom: 10,
				alignItems: 'center',
			}} 
		>
			<TouchableOpacity onPress={() => navigation.navigate('SearchProfileScreen', {
				userId: post.owner_email
			})}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image source={{ uri: post.profile_picture }} style={styles.story} />
					<Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>
						{post.user}
					</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity>
				<Image
					source={{
						uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/more.png',
					}}
					style={{ width: 30, height: 30 }}
				/>
			</TouchableOpacity>
		</View>
  )
}

const styles = StyleSheet.create({
  story: {
		width: 35,
		height: 35,
		borderRadius: 50,
		marginLeft: 6,
		borderWidth: 1.7,
		borderColor: '#ff8501',
	},
})

export default PostHeader
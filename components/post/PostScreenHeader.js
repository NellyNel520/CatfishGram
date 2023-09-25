import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const PostScreenHeader = ({post, navigation}) => {
  return (
    <View style={styles.headerContainer}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
				<Image
					source={{uri: 'https://img.icons8.com/ios/90/ffffff/back--v1.png' }} style={{ width: 30, height: 30}}
				/>
			</TouchableOpacity>
{/* need to find better way to center text */}
      <View style={{alignItems: 'center', marginLeft: '33%'}}>
        <Text style={styles.username}>{post.user.toUpperCase()}</Text>
        <Text style={styles.headerText}>Posts</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
		flexDirection: 'row',
		// justifyContent: 'center',
		alignItems: 'center',
	},
  username: {
		color: 'gray',
		fontWeight: 700,
		fontSize: 15,
		marginTop: 10,
	},
  headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 18,
		// marginTop: 10,
	},
})

export default PostScreenHeader
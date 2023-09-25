import { View, Text } from 'react-native'
import React from 'react'

const Likes = ({post}) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
			<Text style={{ color: 'white', fontWeight: 600 }}>
				{post.likes_by_users.length.toLocaleString('en')} likes
			</Text>
			{/* <Text style={{ color: 'white', fontWeight: 600 }}>{post.likes} likes</Text> */}
		</View>
  )
}

export default Likes
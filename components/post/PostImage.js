import { View, Text, Image } from 'react-native'
import React from 'react'

const PostImage = ({ post }) => {
  return (
    <View style={{ width: '100%', height: 510 }}>
			<Image
				source={{ uri: post.imageUrl }}
				style={{ height: '100%', resizeMode: 'cover' }}
			/>
		</View>
  )
}

export default PostImage
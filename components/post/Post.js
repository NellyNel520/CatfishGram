import {
	View,
	Text,
	Image,
	StyleSheet,
	Touchable,
	TouchableOpacity,
	ScrollView,
	Modal,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase, db } from '../../firebase'
// components

const postFooterIcons = [
	{
		name: 'Like',
		imageUrl: 'https://img.icons8.com/ios/50/ffffff/like--v1.png',
		likedImageUrl: 'https://img.icons8.com/ios-filled/50/F32424/like--v1.png',
	},
	{
		name: 'Comment',
		imageUrl: 'https://img.icons8.com/ios/50/ffffff/speech-bubble--v1.png',
	},
	{
		name: 'Share',
		imageUrl: 'https://img.icons8.com/ios/50/ffffff/speech-bubble--v1.png',
	},
	{
		name: 'Save',
		imageUrl:
			'https://img.icons8.com/fluency-systems-regular/48/ffffff/bookmark-ribbon--v1.png',
	},
]

const Post = () => {
  return (
    <View>
      <Text>Post</Text>
    </View>
  )
}

export default Post
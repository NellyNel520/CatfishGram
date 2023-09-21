import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,

	Modal,
	SafeAreaView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase, db } from '../../firebase'

const CommentSection = ({post}) => {
  const [comments, setComments] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
  return (
    <View>
      <Text>CommentSection</Text>
    </View>
  )
}

export default CommentSection
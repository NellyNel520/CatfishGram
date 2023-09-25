import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../firebase'
// components
import ModalHeader from '../comments/ModalHeader'
import AllComments from '../comments/AllComments'

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


const PostFooter = ({ post, handleLike, comments, setModalVisible, modalVisible }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
    {/* Add modal here for link to comment section and form */}
    {/* need to add comment header section too || all comments component already imported */}
    <View style={styles.leftFooterIconContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(
              firebase.auth().currentUser.email
            )
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl,
          }}
          // source={{uri: postFooterIcons[0].imageUrl}}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // visible={false}
      >
        <View
          style={{
            marginTop: 280,
            backgroundColor: '#5A5A5A',
            flex: 1,
          }}
        >
          <View>
            <ModalHeader modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <AllComments post={post} comments={comments} />
          </View>
        </View>
      </Modal>

      {/* Add on press to trigger modal visibility */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: 'https://img.icons8.com/ios/50/ffffff/speech-bubble--v1.png',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.footerIcon}
          source={{
            uri: 'https://img.icons8.com/ios/50/ffffff/sent--v1.png',
          }}
        />
      </TouchableOpacity>
    </View>

    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <TouchableOpacity>
        <Image
          style={styles.footerIcon}
          source={{
            uri: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/bookmark-ribbon--v1.png',
          }}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  footerIcon: {
		width: 33,
		height: 33,
		marginRight: 6,
	},
	leftFooterIconContainer: {
		flexDirection: 'row',
		width: '32%',
		justifyContent: 'space-between',
	},
})

export default PostFooter
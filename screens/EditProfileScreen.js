import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import Header from '../components/editProfile/Header'
import ProfilePic from '../components/editProfile/ProfilePic'

const EditProfileScreen = ({navigation}) => {



  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Header navigation={navigation}/>
      {/* profile pic */}
     
      <ProfilePic />

      {/* edit form  */}
      {/* links / buttons  */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: 'black',
		flex: 1,
		// justifyContent: 'center',
	},
})

export default EditProfileScreen


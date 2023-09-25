import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/editProfile/Header'

const EditProfileScreen = ({navigation}) => {



  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Header navigation={navigation}/>
      {/* profile pic */}
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


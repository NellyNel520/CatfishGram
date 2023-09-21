import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const SearchUserHeader = ({ user, isCurrentUser, navigation }) => {
  return (
    <View style={styles.container}>
    {/* back arrow */}
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{ uri: 'https://img.icons8.com/ios/90/ffffff/back--v1.png' }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    {/* username */}
    <Text style={styles.username}>{user.username}</Text>
    {/* bell & 3 dots */}

    {!isCurrentUser ? (
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Image
            // source={{uri: 'https://img.icons8.com/carbon-copy/100/ffffff/bell--v1.png'}}
            source={{
              uri: 'https://img.icons8.com/material-outlined/24/ffffff/filled-appointment-reminders.png',
            }}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://img.icons8.com/material-outlined/24/ffffff/more.png',
            }}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.iconsContainer}>
        <View></View>
      </View>
    )}
  </View>
  )
}


const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
		marginLeft: 19,
		resizeMode: 'contain',
	},
	headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		textDecorationLine: 'underline',
		// marginTop: 10,
	},
	iconsContainer: {
		flexDirection: 'row',
	},
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		marginHorizontal: 10,
	},
	username: {
		color: 'white',
		fontWeight: 700,
		fontSize: 20,
	},
})


export default SearchUserHeader
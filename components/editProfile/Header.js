import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>

    {/* nav back to profile screen */}
    <TouchableOpacity onPress={() => navigation.goBack()}>
     <Text style={styles.cancelButton}>Cancel</Text>
    </TouchableOpacity>

    <Text style={styles.headerText}>Edit profile</Text>

    {/* submit button for updating user info ****ADD LATER****  */}
    <Text style={styles.doneButton}> Done </Text>
    {/* empty text component to center tittle */}
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
    // marginLeft: 10
  },
  headerText: {
		color: 'white',
		fontWeight: 800,
		fontSize: 25,
		// marginRight: 25,
	},
  doneButton: {
		color: '#3388FF',
		// fontWeight: 500,
		fontSize: 20,
    textDecorationLine: 'underline'
		// marginRight: 25,
	},
  cancelButton: {
		color: 'white',
		// fontWeight: 500,
		fontSize: 20,
    textDecorationLine: 'underline'
		// marginRight: 25,
	},
})

export default Header
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import LoginForm from '../../components/auth/LgoinForm'

const INSTAGRAM_LOGO = 'https://img.icons8.com/fluency/48/instagram-new.png'

const LoginScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
				<Image source={require('../../assets/catfishGram-logo.png')} style={{width: 220, height: 100, marginTop: 30}}/>
			</View>
			{/* Login Form */}
			<LoginForm navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: 50,
		paddingHorizontal: 12,
	},
	logoContainer: {
		alignItems: 'center',
		marginTop: 60,
	},
})

export default LoginScreen

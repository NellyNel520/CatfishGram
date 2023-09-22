import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native'
import React from 'react'

const ReelsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
				<Image source={{ uri: 'https://img.icons8.com/clouds/100/instagram-reel.png' }} style={{ width: 180, height: 180 }}/>
			</View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: 600, fontSize: 38,}}>Reels</Text>
        <Text style={{color: 'white', fontSize: 25,}}>Coming Soon!</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: 'black',
		flex: 1,
		// justifyContent: 'center',
	},
  logoContainer: {
		alignItems: 'center',
		marginTop: 160,
	},
})

export default ReelsScreen
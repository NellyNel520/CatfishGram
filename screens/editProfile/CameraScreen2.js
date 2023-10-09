import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
	Button,
	Platform,
} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import React, { useState, useEffect } from 'react'


// MAY NEED TO CHANGE FROM A SCREEN TO MODAL INORDER TO UPDATE IMAGE 
const CameraScreen2 = ({ navigation }) => {
	const [type, setType] = useState(CameraType.back)
	const [permission, requestPermission] = Camera.useCameraPermissions()
	const [image, setImage] = useState(null)
	const [isPhotoSelected, setIsPhotoSelected] = useState(false)

	let camera = Camera

	if (!permission) {
		// Camera permissions are still loading
		return <View />
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center', color: 'white' }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		)
	}

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		)
	}

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null)
			setImage(data.uri)
			setIsPhotoSelected(true)
		}
	}

	const clearImage = async () => {
		if (image) {
			setImage(null)
		}
	}

	// console.log(image, 'line 53')
	// console.log(isPhotoSelected, 'line 54')

	const CameraHeader = ({ navigation }) => (
		<View
			style={{
				flexDirection: 'row',
				// marginTop: 25,
				// marginHorizontal: 15,
				justifyContent: 'space-between',
				backgroundColor: 'rgba(0,0,0, 0.8)',
				height: '10%',
			}}
		>
			{/* back button / clear photo buttons */}
			{!image && (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={{
							uri: 'https://img.icons8.com/ios/50/ffffff/back--v1.png',
						}}
						style={{
							width: 40,
							height: 40,
							marginTop: 25,
							marginLeft: 8,
						}}
					/>
				</TouchableOpacity>
			)}

			{image && (
				<TouchableOpacity onPress={() => clearImage()}>
					<Image
						source={{
							uri: 'https://img.icons8.com/ios/50/ffffff/delete-sign--v1.png',
						}}
						style={{
							width: 30,
							height: 30,
							marginTop: 25,
							marginLeft: 20,
						}}
					/>
				</TouchableOpacity>
			)}

			
		</View>
	)

	const Buttons = ({navigation}) => (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			{!image && (
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ width: '20%' }}>
						<View></View>
					</View>

					<TouchableOpacity onPress={() => takePicture()}>
						<Image
							source={{
								uri: 'https://img.icons8.com/nolan/64/filled-circle.png',
							}}
							style={{ width: 100, height: 110 }}
						/>
					</TouchableOpacity>

					{/* flip camera */}
					<TouchableOpacity onPress={toggleCameraType}>
						<View
							style={{
								backgroundColor: '#242526',
								borderRadius: 50,
								padding: 10,
								marginTop: 30,
								// marginLeft: 30
							}}
						>
							<Image
								source={{
									uri: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/refresh--v1.png',
								}}
								style={{ width: 40, height: 40 }}
							/>
						</View>
					</TouchableOpacity>
				</View>
			)}

			{image && (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 85,
						marginLeft: 40,
					}}
				>
					<Image
						source={{ uri: image }}
						style={{
							width: 200,
							height: 200,
							borderRadius: 100,
							marginRight: 10,
							
						}}
					/>
					<TouchableOpacity style={{marginTop: 15}} onPress={() => {
							navigation.navigate('EditProfileScreen', { image })
						}} >
						<Image
							source={{
								uri: 'https://img.icons8.com/ios-filled/50/ffffff/forward--v1.png',
							}}
							style={{ width: 40, height: 40, marginBottom: 15 }}
						/>
						<Text style={{color: 'white',}}>NEXT</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)

	const CameraFooter = () => (
		<View
			style={{
				// marginVertical: 0,
				backgroundColor: '#000000',
				alignItems: 'center',
				flexDirection: 'row',
				justifyContent: 'center',
				padding: 20,
				// height: 140,
			}}
		>
			<Text style={{ color: 'white', fontSize: 20, fontWeight: 500 }}>
				PROFILE PHOTO
			</Text>
		</View>
	)

	return (
		<SafeAreaView style={styles.container}>
			<CameraHeader navigation={navigation} />
			<View style={styles.cameraContainer}>
				<Camera
					style={styles.fixedRatio}
					type={type}
					ratio={'1:1'}
					// ref={ref => setCamera(ref)}
					ref={(r) => {
						camera = r
					}}
				/>
			</View>
			{/* camera button */}

			<Buttons navigation={navigation}/>
			<CameraFooter />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
		justifyContent: 'center',
	},
	cameraContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	fixedRatio: {
		flex: 1,

		aspectRatio: 1,
	},
})

export default CameraScreen2

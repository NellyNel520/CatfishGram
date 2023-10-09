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
import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect } from 'react'


const NewPostScreen = ({ navigation }) => {
	const [type, setType] = useState(CameraType.back)
	const [permission, requestPermission] = Camera.useCameraPermissions()
	const [previewVisible, setPreviewVisible] = useState(false)
	const [image, setImage] = useState(null)

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
			console.log(data.uri)
			setImage(data.uri)
		}
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		console.log(result)

		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	const Buttons = ({ navigation }) => (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ flexDirection: 'row' }}>
			{/* Flip Camera */}
				<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
					<Image source={{uri: 'https://img.icons8.com/ios-glyphs/30/A79F9F/refresh--v1.png'}} style={{width: 60, height: 60}}/>
				</TouchableOpacity>
				{/* Take Picture */}
				<TouchableOpacity style={styles.button} onPress={() => takePicture()}>
					<Image source={{uri: 'https://img.icons8.com/nolan/64/filled-circle.png'}} style={{width: 100, height: 110}}/>
				</TouchableOpacity>
				{/* Pick an image */}
				<TouchableOpacity style={styles.button} onPress={pickImage}>
					<Image source={{uri: 'https://img.icons8.com/sf-regular-filled/48/A79F9F/image.png'}} style={{width: 60, height: 60}}/>
				</TouchableOpacity>
			</View>
			
			{image && (
				<View>
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
					<Button
						title="Next"
						onPress={() => {
							navigation.navigate('SubmitPostScreen', { image })
						}}
					/>
				</View>
			)}
		</View>
	)

	const Header = ({ navigation }) => (
		<View style={styles.headerContainer}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image
					source={{
						uri: 'https://img.icons8.com/ios/50/ffffff/delete-sign--v1.png',
					}}
					style={{ width: 30, height: 30 }}
				/>
			</TouchableOpacity>
			<Text style={styles.headerText}>NEW POST</Text>
			<Text></Text>
			{/* empty text component to center tittle */}
		</View>
	)

	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} />
			{/* <CameraView /> */}
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



			<Buttons navigation={navigation} />
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
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 20,
		marginRight: 25,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		// margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
})

export default NewPostScreen

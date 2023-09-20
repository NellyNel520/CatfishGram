import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { Component, useEffect, useState } from 'react'
import { firebase, db } from '../firebase'
// Screens
import FeedScreen from './main/FeedScreen'
import ProfileScreen from './main/ProfileScreen'
import ReelsScreen from './main/ReelsScreen'
import SearchScreen from './main/SearchScreen'

const Tab = createBottomTabNavigator()

const EmptyScreen = () => {
	return null
}

const MainScreen = () => {
	const [profilePic, setProfilePic] = useState('')

	const getProfilePic = () => {
		// may need to change doc ref from uid to user email to be consistent
		const user = firebase.auth().currentUser.email
		const docRef = db.collection('users').doc(user)
		const unsubscribe = docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					// console.log('Document data:', doc.data())
					// setUsername(doc.data().username)
					setProfilePic(doc.data().profile_picture)
				} else {
					console.log('No such document!')
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error)
			})
		return unsubscribe
	}

	useEffect(() => {
		getProfilePic()
		console.log(profilePic)
	}, [])

	return (
		<View style={styles.container}>
			<Tab.Navigator
				initialRouteName="Feed"
				labeled={false}
				tabBarOptions={{
					showIcon: true,
					showLabel: false,
					indicatorStyle: {
						opacity: 0,
					},
				}}
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: '#000000',
					},
				}}
			>
				<Tab.Screen
					name="Feed"
					component={FeedScreen}
					options={{
						tabBarIcon: ({}) => (
							<Image
								source={{
									uri: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
								}}
								style={{ width: 40, height: 40 }}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Search"
					component={SearchScreen}
					options={{
						tabBarIcon: ({}) => (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios/50/ffffff/search--v1.png',
								}}
								style={{ width: 40, height: 40 }}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Add"
					component={EmptyScreen}
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault()
							navigation.navigate('NewPostScreen')
						},
					})}
					options={{
						tabBarIcon: ({}) => (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios/50/ffffff/plus-2-math.png',
								}}
								style={{ width: 40, height: 40 }}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Reels"
					component={ReelsScreen}
					options={{
						tabBarIcon: ({}) => (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios/50/ffffff/instagram-reel.png',
								}}
								style={{ width: 40, height: 40 }}
							/>
						),
					}}
				/>

				<Tab.Screen
					name="Profile"
					component={ProfileScreen}
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault()
							navigation.navigate('MainScreen', {
								screen: 'Profile',
								params: { uid: firebase.auth().currentUser.email },
							})
							// navigation.navigate("Profile", {uid: firebase.auth().currentUser.email})
						},
					})}
					options={{
						tabBarIcon: ({}) => (
							<Image
								source={{
									uri: profilePic,
									// uri: 'https://images.unsplash.com/photo-1692517299415-6a98f1cadc19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
								}}
								style={{
									width: 40,
									height: 40,
									borderRadius: 50,
									borderColor: 'white',
								}}
							/>
						),
					}}
				/>
				{/* <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
      /> */}
			</Tab.Navigator>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
})

export default MainScreen

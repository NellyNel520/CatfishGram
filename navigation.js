import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// Screen Imports
import LoginScreen from './screens/auth/LoginScreen'
import SignupScreen from './screens/auth/SignupScreen'
import MainScreen from './screens/main/MainScreenTabNavigator'
import NewPostScreen from './screens/NewPostScreen'
import SubmitPostScreen from './screens/SubmitPostScreen'
import PostScreen from './screens/PostScreen'

const Stack = createStackNavigator()

const screenOptions = {
	headerShown: false,
}

export const SignedOutStack = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={screenOptions}
		>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="SignupScreen" component={SignupScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)

export const SignedInStack = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="MainScreen"
			screenOptions={screenOptions}
		>
			<Stack.Screen name="MainScreen" component={MainScreen} />
			<Stack.Screen name="NewPostScreen" component={NewPostScreen} />
			<Stack.Screen name="SubmitPostScreen" component={SubmitPostScreen} />
			<Stack.Screen name="PostScreen" component={PostScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)

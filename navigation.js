import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// Screen Imports
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import MainScreen from './screens/MainScreen'


const Stack = createStackNavigator()

const screenOptions = {
	headerShown: false,
}

export const SignedOutStack = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="SignupScreen"
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

			
		</Stack.Navigator>
	</NavigationContainer>
)



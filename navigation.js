import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'


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
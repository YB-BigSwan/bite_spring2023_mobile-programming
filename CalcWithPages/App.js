import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calc from './components/Calc';
import History from './components/History';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Calculator'>
				<Stack.Screen name='Calculator' component={Calc} />
				<Stack.Screen name='History' component={History} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

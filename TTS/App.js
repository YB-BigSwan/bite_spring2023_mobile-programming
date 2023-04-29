import * as React from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useState } from 'react';

export default function App() {
	const [text, setText] = useState('');

	const speak = () => {
		Speech.speak(text);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.inputStyle}
				value={text}
				onChangeText={(text) => setText(text)}
			/>
			<Button title='Press to hear some words' onPress={speak} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},

	inputStyle: {
		width: '80%',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		padding: 10,
	},
});

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	DevSettings,
} from 'react-native';

export default function App() {
	// Initialize states for the guess, random number, attempt counter, output, and dynamic background color
	const [guess, setGuess] = React.useState('');
	const [randomNumber] = React.useState(Math.floor(Math.random() * 100) + 1);
	/* Had to default to 1, rather than 0 because the alert would trigger before the attempts state updated so the number of attempts would always be one less than the actual amount */
	const [attempts, setAttempts] = React.useState(1);
	const [output, setOutput] = React.useState('');
	const [color, setColor] = React.useState('#3B4252');
	// Dynamic background color
	const colorChange = {
		backgroundColor: color,
	};

	/* Check the guess, say if its too high or too low and set background to red. If it's correct display an alert to congratulate player and set background to green */
	const checkGuess = () => {
		setAttempts(attempts + 1);
		if (guess < randomNumber) {
			setOutput('Too low');
			setColor('#BF616A');
		} else if (guess > randomNumber) {
			setOutput('Too high');
			setColor('#BF616A');
		} else {
			setOutput(
				Alert.alert(
					'Congratulations! You guessed the correct number in ' +
						attempts +
						' attempts!'
				)
			);
			setColor('#A3BE8C');
		}
	};

	// Reloads the app to hard reset the game bc I was too lazy to figure out a better way to do it
	const reset = () => {
		DevSettings.reload();
	};

	return (
		<View style={[styles.container, colorChange]}>
			{/* Output */}
			<View style={styles.outputContainer}>
				<Text style={styles.textStyle}>{output}</Text>
			</View>
			{/* Input */}
			<View style={styles.inputContainer}>
				<Text style={styles.textStyle}>Guess the number</Text>

				<TextInput
					style={styles.inputStyle}
					keyboardType='numeric'
					value={guess}
					onChangeText={(text) => setGuess(parseInt(text))}
					placeholder='Enter your guess'
					min={1}
					max={100}
				/>
				<StatusBar style='auto' />
			</View>
			{/* Buttons. I'm using TouchableOpacity because I wanted to style them a bit */}
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btnStyle} onPress={checkGuess}>
					<Text style={styles.textStyle}>Guess</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btnStyle} onPress={reset}>
					<Text style={styles.textStyle}>Restart</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3B4252',
		alignItems: 'center',
		justifyContent: 'center',
	},

	outputContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},

	inputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	btnContainer: {
		flex: 3,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},

	textStyle: {
		color: '#ECEFF4',
		fontSize: 25,
	},

	inputStyle: {
		height: 55,
		borderColor: '#D8DEE9',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		margin: 20,
		fontSize: 25,
		color: '#ECEFF4',
	},

	btnStyle: {
		backgroundColor: '#81A1C1',
		height: 50,
		width: 110,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginLeft: 5,
		marginRight: 5,
	},
});

import React, { useEffect } from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';

export default function App() {
	// initialize states of the input fields and result.
	// num1 is the upper input field, num2 is the lower field
	const [num1, setNum1] = React.useState(0);
	const [num2, setNum2] = React.useState(0);
	const [result, setResult] = React.useState();
	const [history, setHistory] = React.useState([]);

	useEffect(() => {}, [add, subtract]);

	// adds the numbers and sets the state of result to the sum
	const add = () => {
		let sum = num1 + num2;
		setResult(sum);
		setHistory([...history, `${num1} + ${num2} = ${sum}`]);
	};
	// subtracts the numbers and sets the state of result to the difference
	const subtract = () => {
		let diff = num1 - num2;
		setResult(diff);
		setHistory([...history, `${num1} - ${num2} = ${diff}`]);
	};

	return (
		<View style={styles.container}>
			{/* Result and Input fields */}
			<View style={styles.fieldContainer}>
				<Text style={styles.txtStyle}>Result: {result}</Text>
				{/* set state of num1 from input */}
				<TextInput
					keyboardType='numeric'
					style={styles.inputStyle}
					value={num1}
					onChangeText={(text) => setNum1(parseInt(text))}
				/>
				{/* set state of num2 from input */}
				<TextInput
					keyboardType='numeric'
					style={styles.inputStyle}
					value={num2}
					onChangeText={(text) => setNum2(parseInt(text))}
				/>
			</View>
			{/* Buttons */}
			<View style={styles.btnContainer}>
				{/* using TouchableOpacity instead of Button because there were some iOS vs Android styling issues with Button */}
				<TouchableOpacity style={styles.btnStyle} onPress={add}>
					<Text style={styles.txtStyle}>+</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btnStyle} onPress={subtract}>
					<Text style={styles.txtStyle}>-</Text>
				</TouchableOpacity>
			</View>
			{/* History */}
			<View style={styles.historyContainer}>
				<Text style={styles.txtStyle}>History:</Text>
				{history.map((item, index) => (
					<Text key={index} style={styles.txtStyle}>
						{item}
					</Text>
				))}
			</View>

			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3B4252',
	},

	fieldContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	btnContainer: {
		flex: 0.3,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},

	historyContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	inputStyle: {
		width: 200,
		borderColor: '#E5E9F0',
		color: '#ECEFF4',
		borderWidth: 1,
		borderRadius: 15,
		margin: 5,
		padding: 5,
	},

	btnStyle: {
		width: 35,
		height: 35,
		borderRadius: 5,
		backgroundColor: '#81A1C1',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},

	txtStyle: {
		color: '#ECEFF4',
		textAlign: 'center',
		fontSize: 20,
	},
});

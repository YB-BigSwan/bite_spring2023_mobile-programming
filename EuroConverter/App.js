import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_KEY = 'your-api-key-here';
const API_URL = `https://api.apilayer.com/exchangerates_data/latest?symbols=SEK%2CUSD%2CAUD%2CCAD&base=EUR&apikey=${API_KEY}`;

export default function App() {
	const [rates, setRates] = useState({});
	const [currency, setCurrency] = useState('EUR');
	const [input, setInput] = useState('');
	const [output, setOutput] = useState(0);

	useEffect(() => {
		fetch(API_URL)
			.then((response) => response.json())
			.then((data) => setRates(data.rates))
			.catch((error) => console.log(error));
	}, []);

	const convertCurrency = () => {
		const result = input * rates[currency];
		setOutput(result);
	};

	return (
		<View style={styles.container}>
			<View style={styles.outputContainer}>
				<Text style={styles.outputText}>
					{output.toFixed(2)} {currency}
				</Text>
			</View>

			<View style={styles.inputContainer}>
				<TextInput
					keyboardType='numeric'
					value={input}
					onChangeText={setInput}
					style={styles.input}
				/>
				<Picker
					style={styles.picker}
					selectedValue={currency}
					onValueChange={(itemValue) => setCurrency(itemValue)}>
					{Object.keys(rates).map((key) => (
						<Picker.Item label={key} value={key} key={key} />
					))}
				</Picker>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={convertCurrency} style={styles.button}>
					<Text style={styles.btnText}>Go!</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3B4252',
		padding: 30,
	},

	outputContainer: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},

	outputText: {
		color: '#ECEFF4',
		fontSize: 50,
		fontWeight: 'bold',
	},

	inputContainer: {
		flex: 1,
		flexDirection: 'row',
	},

	input: {
		backgroundColor: '#4C566A',
		borderWidth: 1,
		borderColor: '#ECEFF4',
		borderRadius: 10,
		padding: 15,
		color: '#ECEFF4',
		width: '50%',
		height: 60,
	},

	picker: {
		color: '#ECEFF4',
		backgroundColor: '#4C566A',
		width: '40%',
		height: 60,
		marginLeft: '5%',
	},

	buttonContainer: {
		flex: 3,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},

	button: {
		backgroundColor: '#81A1C1',
		borderRadius: 10,
		width: '50%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},

	btnText: {
		color: '#ECEFF4',
		fontWeight: 'bold',
	},
});

import React from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
} from 'react-native';

export default function App() {
	// initialize states of the input field and history.
	const [text, setText] = React.useState('');
	const [history, setHistory] = React.useState([]);

	// adds new item to history
	const add = () => {
		setHistory([...history, { key: text }]);
		setText('');
	};
	// clears history's state
	const clear = () => {
		setHistory([]);
	};

	return (
		<View style={styles.container}>
			{/*Input fields */}
			<View style={styles.fieldContainer}>
				{/* set state of item from input */}
				<TextInput
					style={styles.inputStyle}
					value={text}
					onChangeText={(text) => setText(text)}
				/>
			</View>
			{/* Buttons */}
			<View style={styles.btnContainer}>
				{/* using TouchableOpacity instead of Button because there were some iOS vs Android styling issues with Button */}
				<TouchableOpacity style={styles.btnStyle} onPress={add}>
					<Text style={styles.txtStyle}>ADD</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btnStyle} onPress={clear}>
					<Text style={styles.txtStyle}>Clear</Text>
				</TouchableOpacity>
			</View>
			{/* History */}
			<View style={styles.historyContainer}>
				<Text style={{ color: '#B48EAD', fontSize: 20 }}>Shopping List</Text>
				<FlatList
					data={history}
					renderItem={({ item }) => (
						<Text style={styles.txtStyle}>{item.key}</Text>
					)}
				/>
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
		width: 60,
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

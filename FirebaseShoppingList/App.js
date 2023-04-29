import React, { useEffect } from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
	// initialize states of the input field and history.
	const [product, setProduct] = React.useState('');
	const [amount, setAmount] = React.useState('');
	const [list, setList] = React.useState([]);

	useEffect(() => {
		const listRef = ref(db, 'items');
		onValue(listRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const groceryList = Object.entries(data).map(([key, value]) => ({
					key,
					...value,
				}));
				setList(groceryList);
			} else {
				setList([]);
			}
		});
	}, []);

	// adds new item to history
	const add = () => {
		if (product && amount) {
			push(ref(db, 'items'), { product, amount });
			setProduct('');
			setAmount('');
		}
	};

	const deleteItem = (item) => {
		const itemID = ref(db, 'items/' + item.key + '/');
		remove(itemID);
	};

	// clears history's state
	const clear = () => {
		setList([]);
	};

	return (
		<View style={styles.container}>
			{/*Input fields */}
			<View style={styles.fieldContainer}>
				{/* set state of item from input */}
				<TextInput
					style={styles.inputStyle}
					placeholder='Product'
					value={product}
					onChangeText={(text) => setProduct(text)}
				/>
				<TextInput
					style={styles.inputStyle}
					placeholder='Amount'
					value={amount}
					onChangeText={(text) => setAmount(text)}
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
					data={list}
					renderItem={({ item }) => (
						<Text style={styles.txtStyle}>
							{item.product} - {item.amount}
							<TouchableOpacity
								style={styles.deleteBtnStyle}
								onPress={deleteItem}>
								<Text>Delete</Text>
							</TouchableOpacity>
						</Text>
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

	deleteBtnStyle: {
		width: 60,
		height: 35,
		borderRadius: 5,
		backgroundColor: '#BF616A',
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

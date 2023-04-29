import React, { useState, useEffect } from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglist.db');

export default function App() {
	const [text, setText] = useState('');
	const [history, setHistory] = useState([]);

	useEffect(() => {
		// create the shopping items table if it doesn't exist
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS shopping_items (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, amount TEXT);'
			);
		});

		// load the shopping items from the database
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM shopping_items;', [], (_, { rows }) =>
				setHistory(rows._array)
			);
		});
	}, []);

	const add = () => {
		// insert the new item into the database
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO shopping_items (product, amount) values (?, ?);',
				[text, '1'],
				(_, { insertId, rows }) => {
					setHistory([
						...history,
						{ id: insertId, product: text, amount: '1' },
					]);
				}
			);
		});
		setText('');
	};

	const clear = () => {
		// clear the shopping items from the database
		db.transaction((tx) => {
			tx.executeSql('DELETE FROM shopping_items;', [], (_, { rows }) =>
				setHistory([])
			);
		});
	};

	const remove = (id) => {
		// remove the item from the database
		db.transaction((tx) => {
			tx.executeSql(
				'DELETE FROM shopping_items WHERE id = ?;',
				[id],
				(_, { rows }) => setHistory(history.filter((item) => item.id !== id))
			);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.fieldContainer}>
				<TextInput
					style={styles.inputStyle}
					value={text}
					onChangeText={(text) => setText(text)}
				/>
			</View>

			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btnStyle} onPress={add}>
					<Text style={styles.txtStyle}>ADD</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btnStyle} onPress={clear}>
					<Text style={styles.txtStyle}>Clear</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.historyContainer}>
				<Text style={{ color: '#B48EAD', fontSize: 20 }}>Shopping List</Text>
				<FlatList
					data={history}
					renderItem={({ item }) => (
						<View style={styles.item}>
							<Text style={styles.txtStyle}>{item.product}</Text>
							<TouchableOpacity
								style={styles.boughtBtn}
								onPress={() => remove(item.id)}>
								<Text style={styles.boughtTxt}>bought</Text>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item) => item.id.toString()}
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

	item: {
		flexDirection: 'row',
		margin: 10,
	},

	boughtBtn: {
		backgroundColor: '#BF616A',
		padding: 10,
		borderRadius: 5,
		marginLeft: 15,
	},
});

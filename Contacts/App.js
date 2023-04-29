import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
	const [contacts, setContacts] = useState([]);

	const getContacts = async () => {
		const { status } = await Contacts.requestPermissionsAsync();
		if (status === 'granted') {
			const { data } = await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
			});

			if (data.length > 0) {
				setContacts(data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={contacts}
				renderItem={({ item }) => (
					<View>
						<Text>{item.name}</Text>
						<Text>{item.phoneNumbers[0].number}</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>

			<Button title='Get Contacts' onPress={getContacts} />
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
});

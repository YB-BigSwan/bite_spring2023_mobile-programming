import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

export default function History({ route }) {
	const { history } = route.params;
	return (
		<View style={styles.container}>
			<Text style={styles.txtStyle}>History:</Text>
			<FlatList
				data={history}
				renderItem={({ item }) => (
					<Text style={styles.txtStyle}>{item.key}</Text>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3B4252',
	},

	txtStyle: {
		color: '#ECEFF4',
		textAlign: 'center',
		fontSize: 20,
	},
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuitTobacco = ({ counterText }) => {
	return (
		<View style={styles.counterContainer}>
			<Text style={styles.counterText}>{counterText}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	counterContainer: {
		flex: 0.4,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20,
		backgroundColor: '#2E3440',
	},
	counterText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#ECEFF4',
	},
});

export default QuitTobacco;

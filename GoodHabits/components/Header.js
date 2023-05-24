import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>Good Habits</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 0.2,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10,
		backgroundColor: '#2E3440',
	},
	headerText: {
		color: '#ECEFF4',
		fontSize: 40,
	},
});

export default Header;

import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const ShowNames = ({ fadeAnim, activityName }) => {
	return (
		<Animated.View
			style={[
				styles.activityNameContainer,
				{
					opacity: fadeAnim,
				},
			]}>
			<Text style={styles.activityNameText}>{activityName}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	activityNameContainer: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	activityNameText: {
		color: 'white',
		fontSize: 16,
	},
});

export default ShowNames;

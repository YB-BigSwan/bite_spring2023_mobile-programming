import React, { useState, useEffect } from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function geocodeAddress(address) {
	const apiKey = 'your-api-key'; // Replace with your own API key
	const baseUrl = 'https://www.mapquestapi.com/geocoding/v1/address';

	const url = `${baseUrl}?key=${apiKey}&location=${address}`;

	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const location = data.results[0].locations[0];
			return {
				latitude: location.latLng.lat,
				longitude: location.latLng.lng,
			};
		});
}

export default function App() {
	const [region, setRegion] = useState(null);
	const [address, setAddress] = useState('');

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Location permission not granted');
				return;
			}
			const { coords } = await Location.getCurrentPositionAsync();
			setRegion({
				latitude: coords.latitude,
				longitude: coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		})();
	}, []);

	const handleAddressSubmit = async () => {
		const coords = await geocodeAddress(address);
		setRegion({
			...coords,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

	return (
		<>
			<MapView style={{ flex: 1 }} region={region}>
				{region && <Marker coordinate={region} />}
			</MapView>
			<View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
				<TextInput
					style={styles.input}
					onChangeText={setAddress}
					value={address}
					placeholder='Enter an address'
				/>
				<TouchableOpacity onPress={handleAddressSubmit} style={styles.button}>
					<Text style={{ color: '#FFF', textAlign: 'center' }}>Show</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3B4252',
		padding: 30,
	},

	input: {
		height: 40,
		borderColor: 'grey',
		borderWidth: 1,
		backgroundColor: '#ECEFF4',
	},

	button: {
		backgroundColor: '#A3BE8C',
		padding: 10,
	},
});

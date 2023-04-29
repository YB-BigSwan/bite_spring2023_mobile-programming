import React, { useState } from 'react';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export default function App() {
	const [recipes, setRecipes] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = () => {
		fetch(API_URL + searchTerm)
			.then((response) => response.json())
			.then((data) => {
				setRecipes(data.meals);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.listContainer}
				data={recipes}
				keyExtractor={(item) => item.idMeal}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<Image
							style={styles.itemImage}
							source={{ uri: item.strMealThumb }}
						/>
						<Text style={styles.itemTitle}>{item.strMeal}</Text>
					</View>
				)}
			/>

			<View style={styles.searchContainer}>
				<TextInput
					style={styles.input}
					placeholder='Enter ingredient...'
					value={searchTerm}
					onChangeText={(text) => setSearchTerm(text)}
				/>
				<TouchableOpacity style={styles.button} onPress={handleSearch}>
					<Text style={styles.buttonText}>Search</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3B4252',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginRight: 10,
		paddingHorizontal: 10,
		color: '#ECEFF4',
	},
	button: {
		padding: 10,
		backgroundColor: '#81A1C1',
		borderRadius: 5,
	},
	buttonText: {
		color: '#ECEFF4',
		fontWeight: 'bold',
	},
	listContainer: {
		flex: 1,
		width: '100%',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	itemImage: {
		width: 50,
		height: 50,
		marginRight: 10,
	},
	itemTitle: {
		fontSize: 16,
		color: '#ECEFF4',
		fontWeight: 'bold',
	},
});

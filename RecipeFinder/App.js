import { StatusBar } from 'expo-status-bar';
import {
	FlatList,
	Image,
	TextInput,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

export default function App() {
	const [recipes, setRecipes] = useState([]);
	const [keyword, setKeyword] = useState('');

	const search = () => {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
			.then((response) => response.json())
			.then((responseData) => {
				setRecipes(responseData.meals);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<View style={styles.container}>
			<View>
				<TextInput
					value={keyword}
					onChangeText={(text) => setKeyword(text)}
					placeholder='Search...'
				/>
				<TouchableOpacity onPress={search}>
					<Text>Search</Text>
				</TouchableOpacity>
			</View>
			<View>
				<FlatList
					data={recipes}
					keyExtractor={(item) => item.idMeal}
					renderItem={({ item }) => (
						<View>
							<Image source={{ uri: item.strMealThumb }} />
							<Text>{item.strMeal}</Text>
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

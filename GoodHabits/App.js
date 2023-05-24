import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import {
	CLIENT_ID,
	CLIENT_SECRET,
	AUTHORIZATION_CODE,
	REFRESH_TOKEN,
	ACCESS_TOKEN,
} from '@env';
import { Calendar } from 'react-native-calendars';

import Header from './components/Header';
import CalendarComponent from './components/Calendar';
import QuitTobacco from './components/QuitTobacco';
import ShowNames from './components/ShowNames';

export default function App() {
	const [workouts, setWorkouts] = useState([]);
	const [activityName, setActivityName] = useState('');
	const [fadeAnim] = useState(new Animated.Value(0));
	const [daysSince, setDaysSince] = useState(0);
	const [totalDistance, setTotalDistance] = useState(0);

	const getStravaData = () => {
		fetch(
			`https://www.strava.com/api/v3/athlete/activities?access_token=${ACCESS_TOKEN}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Request failed with status: ' + response.status);
				}
				return response.json();
			})
			.then((data) => {
				createWorkouts(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const getNewAccessToken = () => {
		fetch(
			`https://www.strava.com/oauth/token?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${AUTHORIZATION_CODE}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`
		)
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
			});
	};

	useEffect(() => {
		getStravaData();
	}, []);

	const createWorkouts = (data) => {
		const newWorkouts = data.map((workout) => {
			const newObj = {};
			const timestamp = moment(workout.start_date).format('YYYY-MM-DD');
			newObj.date = timestamp;
			newObj.value = Math.floor(workout.elapsed_time / 60);
			newObj.name = workout.name;
			newObj.distance = workout.distance;
			return newObj;
		});
		setWorkouts(newWorkouts);
	};

	function getMarkedDates() {
		const markedDates = {};
		workouts.forEach((workout) => {
			const { date, value } = workout;
			let color;
			if (value > 60) {
				color = '#BF616A';
			} else if (value > 40) {
				color = '#D08770';
			} else if (value > 20) {
				color = '#EBCB8B';
			} else if (value > 10) {
				color = '#A3BE8C';
			} else {
				color = '#B48EAD';
			}
			markedDates[date] = {
				startingDay: true,
				endingDay: true,
				color: color,
				textColor: 'white',
				activityName: workout.name,
			};
		});
		return markedDates;
	}

	const handleDayPress = (day) => {
		const selectedDate = day.dateString;
		const markedDate = getMarkedDates()[selectedDate];
		if (markedDate && markedDate.activityName) {
			setActivityName(markedDate.activityName);
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
			setTimeout(() => {
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
				}).start(() => {
					setActivityName('');
				});
			}, 2000);
		}
	};

	const calculateDaysSince = () => {
		const currentDate = moment();
		const targetDate = moment('2023-03-24', 'YYYY-MM-DD');
		const duration = moment.duration(currentDate.diff(targetDate));
		const days = duration.asDays();
		setDaysSince(Math.floor(days));
	};

	const calculateTotalDistance = () => {
		const distanceSum = workouts.reduce(
			(total, workout) => total + workout.distance,
			0
		);
		setTotalDistance(distanceSum / 2000);
	};

	useEffect(() => {
		calculateDaysSince();
		calculateTotalDistance();
	}, []);

	return (
		<View style={styles.container}>
			<Header />
			<CalendarComponent
				markedDates={getMarkedDates()}
				handleDayPress={handleDayPress}
			/>
			<QuitTobacco
				counterText={`Total Distance(YTD): ${totalDistance.toFixed(2)} km`}
			/>
			<QuitTobacco counterText={`${daysSince} days nicotine free`} />
			<ShowNames fadeAnim={fadeAnim} activityName={activityName} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#434C5E',
	},
});

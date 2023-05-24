import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ markedDates, handleDayPress }) => {
	return (
		<Calendar
			style={styles.container}
			markingType={'period'}
			markedDates={markedDates}
			onDayPress={handleDayPress}
			calendarHeight={380}
			theme={{
				calendarBackground: '#434C5E',
				textSectionTitleColor: '#88C0D0',
				textSectionTitleDisabledColor: '#d9e1e8',
				selectedDayBackgroundColor: '#00adf5',
				selectedDayTextColor: '#ECEFF4',
				todayTextColor: '#00adf5',
				dayTextColor: '#ECEFF4',
				textDisabledColor: '#d9e1e8',
				dotColor: '#00adf5',
				selectedDotColor: '#ffffff',
				arrowColor: '#ECEFF4',
				monthTextColor: '#ECEFF4',
				indicatorColor: 'blue',
				textDayFontWeight: '300',
				textMonthFontWeight: 'bold',
				textDayHeaderFontWeight: '300',
				textDayFontSize: 16,
				textMonthFontSize: 16,
				textDayHeaderFontSize: 16,
			}}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		color: '#ECEFF4',
	},
});

export default CalendarComponent;

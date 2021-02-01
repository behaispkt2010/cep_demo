import React, {useState, useEffect} from "react";
import {
	ActivityIndicator,
	View,
	StyleSheet,
	Image
} from 'react-native';
import AuthApi from '../Api/AuthApi';

const Splash = ({navigation}) => {
	const [animating, setAnimating] = useState(true);

	useEffect(() => {
		async function loadSplash() {
			setAnimating(false);
			let token = await AuthApi.getTokenHeader();
			navigation.replace(
	          	token === null ? 'Auth' : 'HomeScreen'
	        );
		}
		setTimeout(() => {
			loadSplash();
		}, 1000);
	}, []);
	return (
		<View style={styles.container}>
			<ActivityIndicator 
				animating={animating}
				color="#FFF"
				size="large"
				style={styles.activityIndicator}
			/>
		</View>
	)
};

export default Splash;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#307ecc'
	},
	activityIndicator: {
		alignItems: 'center',
		height: 80
	}
})


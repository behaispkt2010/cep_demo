import React, {useState, useEffect, createRef, useReducer} from "react";
import { 
	View, 
	Text, 
	TextInput, 
	StyleSheet, 
	Keyboard, 
	KeyboardAvoidingView, 
	ScrollView,
	StatusBar,
	Platform,
	TouchableOpacity
} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'; 
import AuthApi from "../Api/AuthApi";
import UserApi from "../Api/UserApi";
import Loader from '../Components/Loader';
import { showMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store';

const ChangePassword = ({ navigation }) => {
	const passwordInputRef = createRef();
	const passwordNewInputRef = createRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(' ');
	const [errorNewPass, setErrorNewPass] = useState(' ');
	const [errorRepeatPass, setErrorRepeatPass] = useState(' ');
	const [activeStep, setActiveStep] = useState(0);

	const initialUserInput = {
		phone: '',
		oldpassword: '',
		password: '',
		repeatpassword: '',
	}
	const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialUserInput
    );
    const handleChange = (value, name) => {
		let data = {[name]: value}
		setUserInput(data);
	}
	const focusInputWithKeyboard = () => {
	  	passwordInputRef.current.focus();
	}
	const getInfoUser = async() => {
		let user = await AuthApi.getCurrentUser();
		setUserInput({phone: user.phone});
	}
	useEffect(() => {
		getInfoUser();
		focusInputWithKeyboard();
	}, []);
	const checkWithOldPass = () => {
		if(userInput.oldpassword == userInput.password) {
			setErrorNewPass("Mật khẩu mới phải khác mật khẩu hiện tại !!!");
		} else {
			passwordNewInputRef.current.focus();
		}
	}
	const checkRepeatPassword = () => {
		if(userInput.password == userInput.repeatpassword) {
			ChangePasswordUser();
		} else {
			setErrorRepeatPass("Mật khẩu không giống nhau !!!");
		}
	}
	const checkOldPass = async () => {
		try {
			const param = {
				'phone' : userInput.phone,
				'oldpassword': userInput.oldpassword
			};
			const response = await UserApi.checkpass(param);
			if(response.status_code === 200) {
				setActiveStep(activeStep+1);
			} else {
				setError("Mật khẩu không chính xác !!!");
			}
			
			console.log(response);
		} catch (errordata) { 
			console.log("Fail to fetch data: ", errordata);
		}
	}
	const ChangePasswordUser = async () => {
		setLoading(true);
		setErrorNewPass(' ');
		setErrorRepeatPass(' ');
		try {
			const param = {
				'phone' : userInput.phone,
				'oldpassword': userInput.oldpassword,
				'password': userInput.password,
				'repeatpassword': userInput.repeatpassword,
			};
			const response = await UserApi.changepassword(param);
			if(response.status_code === 200) {
				setLoading(false);
				const data = {
                    message: "Đặt mật khẩu thành công !!!",
                    type: "success"
                };
                showMessage(data);
				const credentials = await SecureStore.getItemAsync('camiloysuspasswords');
	            if (credentials) {
	                const newCredentials = { 
	                	phone: userInput.phone, 
	                	password: userInput.password 
	                };
			      	await SecureStore.setItemAsync(
				        'camiloysuspasswords',
				        JSON.stringify(newCredentials)
			      	);
	            }
	            navigation.goBack();
			} else {
				setError("Mật khẩu không chính xác !!!");
			}
			// console.log(response);
		} catch (errordata) { 
			console.log("Fail to fetch data: ", errordata);
		}

	}
	return (
		<View style={styles.container}>
			<Loader loading={loading} />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.key}
				>
				<ProgressSteps activeStep={activeStep}>
			        <ProgressStep removeBtnRow={true}>
			            <View style={styles.input_data}>
					 		<Text style={styles.header}>Nhập mật khẩu hiện tại</Text>
					 		<View style={styles.form}>
					          	<TextInput
					                style={styles.inputStyle}
					                onChangeText={(value) => handleChange(value, 'oldpassword')}
					                placeholder="*****" //12345
					                placeholderTextColor="#d6d6d6"
					                keyboardType="default"
					                ref={passwordInputRef}
					                onSubmitEditing={checkOldPass}
					                blurOnSubmit={false}
					                secureTextEntry={true}
					                underlineColorAndroid="#f000"
					                returnKeyType="next"
					                value={userInput.oldpassword}
					          	/>
					          	<TouchableOpacity
						            style={styles.closeButtonParent}
						            onPress={() => setUserInput({oldpassword: ''})}>
						            <Fontisto name="close" size={24} color="#dadae8" />
					          	</TouchableOpacity>
				          	</View>
				          	{error && <Text style={styles.error}>{error}</Text>}
			          	</View>
			        </ProgressStep>
			        <ProgressStep removeBtnRow={true}>
			            <View style={styles.input_data}>
					 		<Text style={styles.header}>Nhập mật khẩu mới</Text>
					 		<View style={styles.form}>
					          	<TextInput
					                style={styles.inputStyle}
					                onChangeText={(value) => handleChange(value, 'password')}
					                placeholder="*****" //12345
					                placeholderTextColor="#d6d6d6"
					                keyboardType="default"
					                onSubmitEditing={checkWithOldPass}
					                blurOnSubmit={false}
					                secureTextEntry={true}
					                underlineColorAndroid="#f000"
					                returnKeyType="next"
					                value={userInput.password}
					          	/>
					          	<TouchableOpacity
						            style={styles.closeButtonParent}
						            onPress={() => setUserInput({password: ''})}>
						            <Fontisto name="close" size={24} color="#dadae8" />
					          	</TouchableOpacity>
				          	</View>
				          	{errorNewPass && <Text style={styles.error}>{errorNewPass}</Text>}
					 		<Text style={styles.header}>Nhập lại mật khẩu mới</Text>
					 		<View style={styles.form}>
					          	<TextInput
					                style={styles.inputStyle}
					                onChangeText={(value) => handleChange(value, 'repeatpassword')}
					                placeholder="*****" //12345
					                placeholderTextColor="#d6d6d6"
					                keyboardType="default"
					                ref={passwordNewInputRef}
					                onSubmitEditing={checkRepeatPassword}
					                blurOnSubmit={false}
					                secureTextEntry={true}
					                underlineColorAndroid="#f000"
					                returnKeyType="next"
					                value={userInput.repeatpassword}
					          	/>
					          	<TouchableOpacity
						            style={styles.closeButtonParent}
						            onPress={() => setUserInput({repeatpassword: ''})}>
						            <Fontisto name="close" size={24} color="#dadae8" />
					          	</TouchableOpacity>
				          	</View>
				          	{errorRepeatPass && <Text style={styles.error}>{errorRepeatPass}</Text>}
			          	</View>
			        </ProgressStep>
			    </ProgressSteps>
				
	      	</KeyboardAvoidingView>
      	</View>
	)
}

export default ChangePassword;


const styles = StyleSheet.create({
  	container: {
	    flex: 1,
	    backgroundColor: '#fff',
  	},
  	header: {
  		textAlign: "center",
  		fontSize: 16,
  		paddingBottom: 10
  	},
  	input_data: {
	    padding: 24,
	    flex: 1,
	    justifyContent: "center"
  	},
  	inputStyle: {
	    height: 40,
	    width: '90%',
	    paddingLeft: 10,
  	},
  	key: {
  		flex: 1,
  	},
  	closeButton: {
	    height: 16,
	    width: 16,
  	},
  	closeButtonParent: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginRight: 5,
  	},
  	form: {
  		marginLeft: 25,
	    marginRight: 25,
	    borderColor: '#dadae8',
	    borderRadius: 10,
	    borderWidth: 1,
  		flexDirection: 'row',
  		justifyContent: 'space-between',
  	},
  	error: {
  		textAlign: "center",
  		color: "red"
  	}
})
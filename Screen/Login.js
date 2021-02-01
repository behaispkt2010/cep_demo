import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState, useEffect, createRef, useReducer } from "react";
import { StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView, 
  ImageBackground,
  Alert,
  SafeAreaView,
  Dimensions } from "react-native";
import AuthApi from "../Api/AuthApi";
import axios from 'react-native-axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loader from '../Components/Loader';
import { showMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store';

const fingerPrintImage = require('../assets/fp.png');
const bgImage = require('../Image/kh.jpg');
const Stack = createStackNavigator();
let {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
	const initialUserInput = {
		phone: '',
		password: ''
	}
	const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialUserInput
    );
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isCompatible, setIsCompatible] = useState(false);
    const [isEnrolled, setEnrolled] = useState(false);
    const [isAllowFinger, setAllowFinger] = useState(false);
	const handleChange = (value, name) => {
		let data = {[name]: value}
		setUserInput(data);
	}
    const checkSupportDevice = async () => {
        let bAllow = false;
        bAllow = await LocalAuthentication.hasHardwareAsync();
        setIsCompatible(bAllow);
    }
    const checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        setEnrolled(fingerprints);
    };
    const getFingerData = async () => {
        const oSetting = await SecureStore.getItemAsync('configapp');
        if(oSetting) {
            const mySetting = JSON.parse(oSetting);
            setAllowFinger(mySetting.allowFinger);
        }
        const credentials = await SecureStore.getItemAsync('camiloysuspasswords');
        if (credentials) {
            const userData = JSON.parse(credentials);
            setUserInput({phone: userData.phone});
            setUserInput({password: userData.password});
        }
    }
    // get data user from SecureStore for login 
    const getAuthenFromFP = async () => {
        try {
            const credentials = await SecureStore.getItemAsync('camiloysuspasswords');
            // console.log(credentials);
            if (credentials) {
                const userData = JSON.parse(credentials);
                setUserInput({phone: userData.phone});
                setUserInput({password: userData.password});
                // call submit for login with parm
                submit();
            }
        } catch (e) {
            console.log(e);
        }
    }
    // login with finger print
    const submitWithFP = async () => {
        if(isAllowFinger === false) {
            Alert.alert("Vui lòng đăng nhập và cài đặt TouchID hoặc FaceID cho ứng dụng");
        }
        if(isCompatible && isEnrolled && isAllowFinger) {
            await LocalAuthentication.authenticateAsync({promptMessage: 'Use TouchID to unclock'})
            .then(res => {
                if(res.success === true){
                    // call get authen from SecureStore
                    // getAuthenFromFP();
                    submit();
                }
            })
        }
    }
    useEffect(() => {
        checkSupportDevice();
        checkForFingerprints();
        getFingerData();
    },[]);
    const passwordInputRef = createRef();
	const submit = () => {
        setLoading(true);
		const param = {
            phone: userInput.phone,
            password: userInput.password
        };
        console.log(param);
        AuthApi.login(param).then(
            (rs) => {
                console.log(rs);
        		if(rs.status_code == 404) {
                    setLoading(false);
                    const data = {
                        message: "Đăng nhập thất bại, vui lòng kiểm tra lại !!!",
                        type: "danger",
                    }
                    console.log('fail');
                    showMessage(data);
                } else {
                	navigation.replace('HomeScreen');
                    const data = {
                        message: "Đăng nhập thành công !!!",
                        type: "success",
                    }
                    showMessage(data);
                }
            }, (error) => {
                setLoading(false);
                const resMessage =  error.response.data.error;
                for(const err in resMessage){
                    resMessage[err].forEach((errName, idx) => {
                        console.log(err);
                        setErrortext({[err]: errName});
                    });
                }
            }

        );
  	};
	return (
		<View style={styles.mainBody}>
            <Loader loading={loading} />
            <ImageBackground source={bgImage} style={styles.imageBg} >
                <View style={styles.mainBody}>
                    <KeyboardAvoidingView enabled>
                        <View style={{justifyContent: 'center',
                            alignContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={require('../Image/ceplarge.png')}
                                    style={{
                                      width: '50%',
                                      height: 100,
                                      resizeMode: 'contain',
                                      margin: 30,
                                    }}
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                              <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'phone')}
                                placeholder="Tên đăng nhập" //dummy@abc.com
                                placeholderTextColor="#000"
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                keyboardType="phone-pad"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                              />
                            </View>
                            <View style={styles.SectionStyle}>
                              <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'password')}
                                placeholder="Mật khẩu" //12345
                                placeholderTextColor="#000"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                              />
                            </View>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                // onPress={handleSubmitPress}
                                onPress={({navigation}) => submit(navigation)}
                                >
                                <Text style={styles.buttonTextStyle}>
                                    ĐĂNG NHẬP
                                </Text>
                            </TouchableOpacity>
                            {(isCompatible && isAllowFinger) && 
                                <TouchableOpacity
                                    // onPress={handleSubmitPress}
                                    onPress={({navigation}) => submitWithFP(navigation)}
                                    >
                                    <View style={styles.singinfp}>
                                        <Image style={ styles.fpImage } source={ fingerPrintImage } />
                                        <Text style={{color: '#fff'}}> Mở khóa bằng vân tay</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity
                                style={styles.buttonSignup}
                                onPress={() => navigation.navigate("Register")}
                                >
                                <View style={styles.ViewSingup}>
                                    <Text style={styles.buttonTextStyle}>
                                        Hoặc đăng ký
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
		</View>
	)
}

export default Login;


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.8
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 25,
  },
  buttonSignup: {
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
    backgroundColor: "white"
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  fpImage: {
    alignSelf: "center",
    marginBottom: 8,
    height: 30,
    width: 30,
  },
  singinfp: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
    ViewSingup: {
        borderRadius: 10,
        backgroundColor: "#7a7a7a80"
    }
});
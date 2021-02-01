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
import { MaterialIcons, AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons'; 

const bgImage = require('../Image/bitexco.jpg');
let {width, height} = Dimensions.get('window');

const Register = ({navigation}) => {
    const initialUserInput = {
        idcard: '',
        idmotel: '',
        name: '',
        password: '',
        phone: '',
    }
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialUserInput
    );
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const handleChange = (value, name) => {
        let data = {[name]: value}
        setUserInput(data);
    }
    const AddDataUser = () => {
        const param = {
            'idcard' : userInput.idcard,
            'idmotel' : userInput.idmotel,
            'name' : userInput.name,
            'password' : userInput.password,
            'phone' : userInput.phone
        };
        if(userInput.idcard != '' || userInput.idmotel != '') {
            setLoading(true);
            AuthApi.register(param).then(
                (rs) => {
                    // console.log(rs);
                    setLoading(false);
                    const data = {
                        message: "Đăng ký thành công !!!",
                        type: "success",
                    }
                    showMessage(data);
                    setUserInput([]);
                    navigation.navigate('HomeScreen');
                }, (error) => {
                    const resMessage =  error.response.data.error;
                    setLoading(false);
                    // console.log(error);
                    for(const err in resMessage){
                        resMessage[err].forEach((errName, idx) => {
                            showMessage({[err]: errName});
                        });
                    }
                }
            );
        } else {
            const data = {
                message: "Vui lòng nhập dữ liệu",
                type: "danger",
            }
            showMessage(data);
        }
    }
    return (
        <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.imageBg} ><KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                style={styles.key}
            >
            <ScrollView>
                <SafeAreaView>
                    <View style={{paddingTop: 10}}>
                        <Loader loading={loading} />
                        <View style={styles.input_data}>
                            <Text style={styles.labelStyle}>ID Khách hàng</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'idcard')}
                                placeholder="ID Khách hàng" //12345
                                placeholderTextColor="#d6d6d6"
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                    Keyboard.dismiss()
                                }
                                keyboardType="default"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                value={userInput.idcard}
                            />
                        </View>
                        <View style={styles.input_data}>
                            <Text style={styles.labelStyle}>Mã đơn vị</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'idmotel')}
                                placeholder="Mã đơn vị" //12345
                                placeholderTextColor="#d6d6d6"
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                    Keyboard.dismiss()
                                }
                                keyboardType="default"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                value={userInput.idmotel}
                            />
                        </View>
                        <View style={styles.input_data}>
                            <Text style={styles.labelStyle}>Tên người dùng</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'name')}
                                placeholder="Tên người dùng" //12345
                                placeholderTextColor="#d6d6d6"
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                    Keyboard.dismiss()
                                }
                                keyboardType="default"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                value={userInput.name}
                            />
                        </View>
                        <View style={styles.input_data}>
                            <Text style={styles.labelStyle}>Mật khẩu</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'password')}
                                placeholder="Mật khẩu" //12345
                                placeholderTextColor="#d6d6d6"
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                    Keyboard.dismiss()
                                }
                                keyboardType="default"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                secureTextEntry={true}
                                value={userInput.password}
                            />
                        </View>
                        <View style={styles.input_data}>
                            <Text style={styles.labelStyle}>Số điện thoại</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(value) => handleChange(value, 'phone')}
                                placeholder="Số điện thoại"
                                placeholderTextColor="#6c757d"
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                    Keyboard.dismiss()
                                }
                                keyboardType="number-pad"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                                value={userInput.phone}
                                />
                        </View>
                        
                        <TouchableOpacity style={styles.button} onPress={() => AddDataUser()}>
                            <Text style={styles.textBtn}>ĐĂNG KÝ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate("Login")}
                            >
                            <View style={styles.ViewSingin}>
                                <Text style={styles.textBtnSignin}>
                                    Hoặc đăng nhập
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    imageBg: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        // paddingTop: 10
    },
    key: {
        flex: 1,
    },
    labelStyle: {
        padding: 5,
        fontSize: 16,
        opacity: 0.7,
        color: "#fff"
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        borderColor: '#dadae8',
        backgroundColor: "white",
        fontSize: 17
    },
    input_data: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        height: 90
    },
    labelHeader: {
        fontSize: 18,
        opacity: 0.6,
        fontWeight: "bold",
        textAlign: "center"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#003399",
        padding: 15,
        margin: 10,
        height: 60,
        borderRadius: 15
    },
    textBtn: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonLogin: {
        alignItems: "center",
    },
    textBtnSignin: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
    },
    func: {
        flexDirection: 'row', 
        justifyContent: 'center',
        marginBottom: 10
    },
    ViewSingin: {
        borderRadius: 10,
        backgroundColor: "#7a7a7a80"
    }
});
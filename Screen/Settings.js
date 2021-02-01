import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    FlatList, 
    Switch, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert,
    Keyboard
} from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Modal from 'react-native-modal';
import AuthApi from '../Api/AuthApi';
import UserApi from '../Api/UserApi';

const Settings = ({navigation}) => {
    const deviceWidth = Dimensions.get("window").width;
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(' ');
    const [loading, setLoading] = useState(false);

    const getInfoUser = async() => {
        let user = await AuthApi.getCurrentUser();
        setPhone(user.phone);
    }
    const getDataSetting = async () => {
        const oSetting = await SecureStore.getItemAsync('configapp');
        if(oSetting) {
            const mySetting = JSON.parse(oSetting);
            // console.log(mySetting);
            setIsEnabled(mySetting.allowFinger);
        }
    }
    const toggleSwitch = () => {
        setModalVisible(!modalVisible);
    };
    const addAuthenFromFinger = async () => {
        try {
            let newCredentials = { 
                phone: phone, 
                password: password 
            };
            await SecureStore.setItemAsync(
                'camiloysuspasswords',
                JSON.stringify(newCredentials)
            );
        } catch (e) {
            console.log(e);
        }
    }
    const checkOldPass = async () => {
        try {
            const param = {
                'phone' : phone,
                'oldpassword': password
            };
            const response = await UserApi.checkpass(param);
            if(response.status_code === 200) {
                toggleSwitch();
                setIsEnabled(!isEnabled);
                const finger = {allowFinger: !isEnabled};
                await SecureStore.setItemAsync(
                    'configapp',
                    JSON.stringify(finger)
                );
                addAuthenFromFinger();
            } else {
                setError("Mật khẩu không chính xác !!!");
            }
        } catch (errordata) { 
            console.log("Fail to fetch data: ", errordata);
        }
        setPassword('');
    }
    const onCloseModal = () => {
        setModalVisible(false);
        Keyboard.dismiss();
    }
    useEffect(() => {
        getDataSetting();
        getInfoUser();
    }, [isEnabled]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.headerStyle}>TÀI KHOẢN</Text>
                    <View>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('ChangePassword')}>
                            <View style={styles.confirmFP}>
                                <Text style={styles.func}>Đặt mật khẩu</Text>
                                <AntDesign style={styles.iconRight} name="right" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.confirmFP}>
                                <Text style={styles.func}>Xác thực vân tay</Text>
                                <Switch
                                    style={styles.icon}
                                    trackColor={{ false: "#767577", true: "#40e02c" }}
                                    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    value={isEnabled}
                                    onValueChange={toggleSwitch}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.headerStyle}>NGÔN NGỮ</Text>
                    <TouchableOpacity onPress={() => Alert.alert('Comming soon ...')}>
                        <View style={styles.confirmFP}>
                            <Text style={styles.func}>Ngôn ngữ</Text>
                            <AntDesign style={styles.iconRight} name="right" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        isVisible={modalVisible}
                        animationInTiming={1}
                        deviceWidth={deviceWidth}
                        onBackdropPress={() => onCloseModal()}
                        backdropColor="#777575"
                        style={{margin: 0}}
                        >
                        <View style={styles.modalView}>
                            
                            <View style={styles.input_data}>
                                <View style={styles.headerPass}>
                                    <Text>
                                        <TouchableOpacity onPress={() => onCloseModal()}>
                                            <Fontisto name="close-a" size={16} color="black" />
                                        </TouchableOpacity>
                                    </Text>
                                    <Text style={styles.header}>Nhập mật khẩu</Text>
                                    <Text></Text>
                                </View>
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        onChangeText={(v) => setPassword(v)}
                                        placeholder="*****" //12345
                                        placeholderTextColor="#d6d6d6"
                                        keyboardType="default"
                                        autoFocus={true}
                                        onSubmitEditing={() => checkOldPass()}
                                        blurOnSubmit={false}
                                        secureTextEntry={true}
                                        underlineColorAndroid="#f000"
                                        returnKeyType="next"
                                        value={password}
                                    />
                                    <TouchableOpacity
                                        style={styles.closeButtonParent}
                                        onPress={() => setPassword('')}>
                                        <Fontisto name="close" size={24} color="#dadae8" />
                                    </TouchableOpacity>
                                </View>
                                {error && <Text style={styles.error}>{error}</Text>}
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerStyle: {
        fontSize: 20,
        padding: 10,
        color: '#000000',
        backgroundColor: '#f5f5f7'
    },
    func: {
        fontSize: 16,
        padding: 10,
    },
    confirmFP: {
        flexShrink: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderColor: "#f1efef",
    },
    icon: {
        marginRight: 10
    },
    iconRight: {
        marginRight: 10,
        opacity: 0.5
    },
    centeredView: {
        flex: 1
    },
    modalView: {
        backgroundColor: "#e4e4e4",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    header: {
        textAlign: "center",
        fontSize: 18,
        paddingBottom: 10
    },
    input_data: {
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    inputStyle: {
        height: 40,
        width: '90%',
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "#fff",
        textAlign: "center"
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
        backgroundColor: "#fff"
    },
    error: {
        textAlign: "center",
        color: "red"
    },
    headerPass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

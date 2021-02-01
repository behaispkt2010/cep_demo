import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { FontAwesome5, Fontisto, Entypo, MaterialIcons } from '@expo/vector-icons';
import AuthApi from "../Api/AuthApi";
import { Alert } from 'react-native';

let {width, height} = Dimensions.get('window');
let box_count = 3;
let box_width = (width - 32) / box_count;
const bgImage = require('../Image/bitexco.jpg');

const Home = ({ navigation }) => {
    const [uData, setUdata] = useState([]);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showSuperAdmin, setShowSuperAdmin] = useState(false);
    const getUserData = async () => {
        let user = await AuthApi.getCurrentUser();
        if(user) {
            setUdata(user);
            setShowAdmin(user.role.includes("admin"));
            setShowSuperAdmin(user.role.includes("super-admin"));
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <ImageBackground source={bgImage} style={styles.imageBg}>
            <ScrollView>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.slidebar}>
                        <TouchableOpacity onPress={() => navigation.navigate('SummaryDeposit')}>
                            <View style={styles.slidebar_main}>
                                <View style={styles.iconSlidebar}>
                                    <MaterialIcons name="monetization-on" size={40} color="white"  />
                                </View>
                                <Text style={styles.content_slidebar}>Tóm tắt các khoản vay</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('RenewDeposit')}>
                            <View style={styles.slidebar_main}>
                                <View style={styles.iconSlidebar}>
                                    <FontAwesome5 name="rocket" size={40} color="white" />
                                </View>
                                <Text style={styles.content_slidebar}>Tạo yêu cầu tái vay</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.slidebar_main}>
                                <View style={[styles.iconSlidebar, styles.customerSlidebar]}>
                                    <FontAwesome5 name="star" size={40} color="white" />
                                </View>
                                <Text style={styles.content_slidebar}>Tính năng nỗi bật</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.home_top}>
                        <View style={styles.home_top_main}>
                            <Image source={require('../Image/credit-block.png')} style={styles.icon_main}/>
                            <Text style={styles.box_content_top}>Tổng dư nợ</Text>
                            <TouchableOpacity onPress={() => Alert.alert("Chi tiết khoản vay")}>
                                <Text style={styles.box_money}>5.000.000 VND</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.home_second}>
                        <View style={styles.headerFieldSet}>
                            <Text style={styles.labelHeader}>
                                Tiết kiệm
                            </Text>
                        </View>
                        <View style={styles.imgMenuHome}>
                            <View style={styles.imgMenu}>
                                <Image source={require('../Image/i-saving-hover.png')} style={styles.icon_main}/>
                            </View>
                        </View>
                        <View style={styles.home_second_child}>
                            <View style={styles.home_top_main}>
                                <View style={styles.groupIcon}>
                                    <Entypo name="direction" size={24} color="white" />
                                    <Text style={styles.box_content}>Định hướng</Text>
                                </View>
                                <TouchableOpacity onPress={() => Alert.alert("Chi tiết tiết kiệm định hướng")}>
                                    <Text style={styles.box_money}>3.300.000đ</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.home_top_main}>
                                <View style={styles.groupIcon}>
                                    <Entypo name="ticket" size={24} color="white" />
                                    <Text style={styles.box_content}>Bắt buộc</Text>
                                </View>
                                <TouchableOpacity onPress={() => Alert.alert("Chi tiết tiết kiệm bắt buộc")}>
                                    
                                    <Text style={styles.box_money}>4.500.000đ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.home_second}>
                        <View style={styles.headerFieldSet}>
                            <Text style={styles.labelHeader}>
                                Tiền gửi
                            </Text>
                        </View>
                        <View style={styles.imgMenuHome}>
                            <View style={styles.imgMenu}>
                                <Image source={require('../Image/i-credit-hover.png')} style={styles.icon_main}/>
                            </View>
                        </View>
                        <View style={styles.home_second_child}>
                            <View style={styles.home_top_main}>
                                <View style={styles.groupIcon}>
                                    <MaterialIcons name="timer" size={24} color="white" />
                                    <Text style={styles.box_content}>Có kỳ hạn</Text>
                                </View>
                                <TouchableOpacity onPress={() => Alert.alert("Chi tiết tiền gửi có kỳ hạn")}>
                                    <Text style={styles.box_money}>3.300.000đ</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.home_top_main}>
                                <View style={styles.groupIcon}>
                                    <MaterialIcons name="timer-off" size={24} color="white" />
                                    <Text style={styles.box_content}>Không kỳ hạn</Text>
                                </View>
                                <TouchableOpacity onPress={() => Alert.alert("Chi tiết tiền gửi không kỳ hạn")}>
                                    
                                    <Text style={styles.box_money}>4.500.000đ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.home_second, {paddingVertical: 20}]}>
                        <View style={[styles.imgMenuHome, {paddingTop: 10}]}>
                            <View style={styles.imgMenu}>
                                <FontAwesome5 name="business-time" size={50} color="white" />
                            </View>
                        </View>
                        <View style={styles.headerFieldSet}>
                            <Text style={styles.labelHeader}>
                                Họp cụm sẽ diễn ra vào ngày <Text style={[styles.box_money]}>30/01/2021</Text>
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
};

export default Home;
const styles = StyleSheet.create({
    icon: {
        textAlign: 'center'
    },
    container: {
        flex: 1, 
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    home_top: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#7a7a7a80",
        marginBottom: 5,
    },
    home_top_main: {
        flex: 1,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    box_content_top: {
        paddingTop: 15,
        padding: 3,
        fontSize: 12,
        textAlign: 'center',
        textTransform: "uppercase",
        fontSize: 16,
        color: '#fff'
    },
    home_second: {
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: "#7a7a7a80",
        marginBottom: 5,
    },
    home_second_child: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    box_money: {
        paddingTop: 15,
        padding: 3,
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "bold"
    },
    box: {
        padding: 10,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: "#f1efef",
        borderRadius: 2,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    box_content: {
        paddingTop: 5,
        padding: 5,
        fontSize: 15,
        textAlign: 'center',
        color: "#fff"
    },
    imageBg: {
        flex: 1,
        resizeMode: 'cover',
    },
    icon_main: {
        width: box_width/2,
        height: box_width/2,
    },
    headerFieldSet: {
        marginVertical: 10,
        padding: 5,
        paddingLeft: 20,
    },
    labelHeader: {
        fontSize: 18,
        color: "#fff"
    },
    groupIcon: {
        flexDirection: "row"
    },
    imgMenuHome: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    imgMenu: {
        flex: 1,
        alignItems: 'center',
    },
    slidebar: {
        flexDirection: 'row', 
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "#7a7a7a80"
    },
    slidebar_main: {
        padding: 10,
        alignItems: 'center',
        textAlign: 'center',
        width: box_width,
        height: box_width,
    },
    content_slidebar: {
        color: 'white',
        fontSize: 16,
        textAlign: "center",
        paddingTop: 5,
    },
    iconSlidebar: {
        backgroundColor: '#003399',
        borderWidth: 0.5,
        borderColor: "transparent",
        borderRadius: 20,
        padding: 10
    },
    customerSlidebar: {
        backgroundColor: "transparent",
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: "#f1efef"
    }
});
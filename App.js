import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from "./Screen/Splash";
import Login from "./Screen/Login";
import Home from "./Screen/Home";
import Settings from "./Screen/Settings";
import Help from "./Components/Help";
import AuthApi from "./Api/AuthApi";
import ChangePassword from "./Screen/ChangePassword";
import Register from "./Screen/Register";
import SummaryDeposit from "./Screen/SummaryDeposit";
import RenewDeposit from "./Screen/RenewDeposit";
import OldDeposit from "./Screen/OldDeposit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from "react-native-flash-message";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// init auth 

const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name="Register"
                component={Register}
                options={({ navigation }) => ({
                    title: 'Đăng ký tài khoản', //Set Header Title
                    headerLeft: () => (
                        <TouchableOpacity>
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: '#003399', //Set Header color
                    },
                    headerTintColor: '#FFF', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                })}
            />
        </Stack.Navigator>
    )
}
const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    title: 'Trang chủ', //Set Header Title
                    headerLeft: () => (
                        <TouchableOpacity>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                  'Logout',
                                  'Are you sure? You want to logout?',
                                  [
                                    {
                                      text: 'Cancel',
                                      onPress: () => {
                                        return null;
                                      },
                                    },
                                    {
                                      text: 'Confirm',
                                      onPress: () => {
                                        AuthApi.logout();
                                        navigation.replace('Auth');
                                      },
                                    },
                                  ],
                                  {cancelable: false},
                                );
                              }}
                            >
                            <MaterialCommunityIcons name="power" style={styles.iconback} size={24} color="white" />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: '#003399', //Set Header color
                    },
                    headerTintColor: '#FFF', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                })}
            />
        </Stack.Navigator>
    )
}
const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Settings"
                component={Settings}
                options={({ navigation }) => ({
                    title: 'Settings Title', //Set Header Title
                    headerLeft: () => (
                        <TouchableOpacity>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Help')}
                            >
                            <Ionicons name="help-circle-outline" style={styles.iconback} size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: '#fff', //Set Header color
                    },
                    headerTintColor: '#000', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                })}
            />
        </Stack.Navigator>
    )
}
const HomeScreen = () => {
    return(
        <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
                activeTintColor: '#003399',
                inactiveTintColor: '#fff',
                style: {
                    backgroundColor: '#00339991',
                },
            }}
            >
            <Tab.Screen 
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Settings"
                component={SettingsStack}
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
export default function App() {
  return (
    <NavigationContainer>
        <FlashMessage position="top" />
        
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen 
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Auth"
                component={Auth}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            
            <Stack.Screen 
                name="Help"
                component={Help}
                options={{
                    title: 'Help',
                    headerStyle: {
                        backgroundColor: '#fff', //Set Header color
                    },
                    headerRight: () => (
                        <TouchableOpacity />
                    ),
                    headerTintColor: '#000', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                }}
            />
            <Stack.Screen 
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    title: 'Đặt mật khẩu',
                    headerStyle: {
                        backgroundColor: '#fff', //Set Header color
                    },
                    headerBackTitle: "Back",
                    headerRight: () => (
                        <TouchableOpacity />
                    ),
                    headerTintColor: '#000', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                }}
            />
            <Stack.Screen 
                name="SummaryDeposit"
                component={SummaryDeposit}
                options={{
                    title: 'Tóm tắt các khoản vay',
                    headerStyle: {
                        backgroundColor: '#003399', //Set Header color
                    },
                    headerBackTitle: "Back",
                    headerRight: () => (
                        <TouchableOpacity />
                    ),
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                }}
            />
            <Stack.Screen 
                name="RenewDeposit"
                component={RenewDeposit}
                options={{
                    title: 'Yêu cầu tái vay',
                    headerStyle: {
                        backgroundColor: '#003399', //Set Header color
                    },
                    headerBackTitle: "Back",
                    headerRight: () => (
                        <TouchableOpacity />
                    ),
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                }}
            />
            <Stack.Screen 
                name="OldDeposit"
                component={OldDeposit}
                options={{
                    title: 'Các khoản vay trước',
                    headerStyle: {
                        backgroundColor: '#003399', //Set Header color
                    },
                    headerBackTitle: "Back",
                    headerRight: () => (
                        <TouchableOpacity />
                    ),
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 0,
        color: '#000000',
    },
    iconback: {
        paddingHorizontal: 15,
    }
});

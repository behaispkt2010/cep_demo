import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from "./Screen/Splash";
import Login from "./Screen/Login";
import List from "./Screen/List";
import Home from "./Screen/Home";
import Help from "./Components/Help";
import Settings from "./Screen/Settings";

const AppNavigator = createStackNavigator({
  	Home: { screen: Home },
});

export default AppNavigator;